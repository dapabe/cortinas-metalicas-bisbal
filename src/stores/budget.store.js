import { create } from "zustand";
import { BudgetConfig } from "#/constants/budget.config";
import {
	BlendMode,
	ColorTypes,
	PDFDocument,
	PDFFont,
	PDFPage,
	rgb,
} from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

/**
 * @typedef {import("../schemas/BudgetForm.schema").IBudgetForm} IBudgetForm
 * @typedef {import("../schemas/BudgetForm.schema").IBudgetItem} IBudgetItem
 */

/**
 * @typedef {Object} IBudgetStore
 * @property {number} _IVA
 * @property {(value: number) => string} formatCurrency
 * @property {(values: IBudgetItem[]) => number} calculateTotal
 * @property {{
 * 	currentPage: PDFPage,
 * 	SegoeUINormalFont: PDFFont,
 * 	SegoeUIBoldFont: PDFFont,
 * }} _PDFConfigs
 * @property {(data: IBudgetForm) => void} generatePDF
 * @property {()=> PDFPage} addPage
 * @property {(yPos: number, text: string, size?: number)=> void} drawSubHeader
 * @property {(yPos: number)=>void} drawTextDecoration
 * @property {(data: IBudgetForm)=> void} fillDefaultForm
 * @property {(data: IBudgetForm)=> void} createProductTable
 * @property {(data: IBudgetForm)=> void} createFooter
 * @property {()=> void} addPageEnumeration
 * @property {(yPos: number)=> void} safeMoveDown
 * @property {(text: string, font: PDFFont, fontSize: number, maxWidth: number)=> string[]} _splitTextIntoLines
 */

/**
 * @template T
 * @callback cb
 * @param {T}
 * @returns {string | null}
 */

const currencyIntl = new Intl.NumberFormat("es-AR", {
	style: "currency",
	currency: "ARS",
	minimumFractionDigits: 0,
	maximumFractionDigits: 2,
});
/**	@param {Date} date */
const formatDateToString = (date) =>
	new Date(date).toLocaleDateString("es-AR", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});

/**
 * @type {import("zustand").UseBoundStore<import("zustand").StoreApi<IBudgetStore>>}
 */
export const useBudgetStore = create((set, get) => ({
	_IVA: 1.21, // 21% IVA
	formatCurrency: (value) => currencyIntl.format(value),
	calculateTotal: (values) => {
		let total = values.reduce((acc, item) => {
			const subtotal = acc + item.price * item.quantity;
			return subtotal - (subtotal * item.discount) / 100;
		}, 0);
		return total;
	},

	_PDFConfigs: null,

	generatePDF: async (data) => {
		const templateBytes = await fetch("/CortinasBisbal-Plantilla2.pdf").then(
			(x) => x.arrayBuffer()
		);
		const doc = await PDFDocument.load(templateBytes);
		doc.registerFontkit(fontkit);
		const SegoeUIBoldFont = await doc.embedFont(
			await fetch("/Segoe UI Bold.ttf").then((x) => x.arrayBuffer())
		);
		const SegoeUINormalFont = await doc.embedFont(
			await fetch("/Segoe UI.ttf").then((x) => x.arrayBuffer())
		);

		let currentPage = doc.getPages()[0];
		currentPage.setLineHeight(12);
		set({
			_PDFConfigs: {
				SegoeUINormalFont,
				SegoeUIBoldFont,
				currentPage,
			},
		});
		get().fillDefaultForm(data);

		get()._PDFConfigs.currentPage.moveUp(540);
		// get().createProductTable(data);

		get().drawSubHeader(currentPage.getY(), BudgetConfig.Titles.Notes);

		currentPage.moveDown(24);
		const lines = get()._splitTextIntoLines(
			data.notes,
			SegoeUINormalFont,
			BudgetConfig.PDF.FontSizes.SM,
			Math.ceil(
				currentPage.getWidth() - BudgetConfig.PDF.LayoutSizes.Margin.Left * 2
			)
		);
		for (let i = 0; i < lines.length; ++i) {
			currentPage.drawText(lines[i], {
				x: BudgetConfig.PDF.LayoutSizes.Margin.Left + 2,
				size: BudgetConfig.PDF.FontSizes.SM,
			});
			if (i !== lines.length - 1)
				currentPage.moveDown(BudgetConfig.PDF.FontSizes.SM + 2);
		}

		currentPage.moveDown(24);
		get().drawSubHeader(
			currentPage.getY(),
			BudgetConfig.Titles.TsCs,
			BudgetConfig.PDF.FontSizes.LG
		);

		currentPage.moveDown(24);
		get().createFooter(data);

		get().addPageEnumeration();

		const bytes = await doc.save();
		const blob = new Blob([bytes], { type: "application/pdf" });
		window.open(URL.createObjectURL(blob));
	},

	addPage: () => {
		const nwP = get()._PDFConfigs.currentPage.doc.addPage();
		set({ _PDFConfigs: { currentPage: nwP } });

		return get()._PDFConfigs.currentPage;
	},

	drawSubHeader: (yPos, text, size = BudgetConfig.PDF.FontSizes.MD) => {
		get()._PDFConfigs.currentPage.drawText(text, {
			x: BudgetConfig.PDF.LayoutSizes.Margin.Left + 2,
			y: yPos,
			size: size,
			color: BudgetConfig.PDF.Colors.SubHeaderText,
			font: get()._PDFConfigs.SegoeUIBoldFont,
		});
		get().drawTextDecoration(yPos);
	},

	drawTextDecoration: (yPos) => {
		get()._PDFConfigs.currentPage.drawLine({
			thickness: 1,
			color: BudgetConfig.PDF.Colors.SubHeaderText,
			start: {
				x: BudgetConfig.PDF.LayoutSizes.Margin.Left,
				y: yPos - 8,
			},
			end: {
				x:
					get()._PDFConfigs.currentPage.getWidth() -
					BudgetConfig.PDF.LayoutSizes.Margin.Left,
				y: yPos - 8,
			},
		});
	},

	fillDefaultForm: (data) => {
		const form = get()._PDFConfigs.currentPage.doc.getForm();
		/**
		 * @function setField
		 * @template T
		 * @param {string} fieldName
		 * @param {cb<T>} [cb]
		 */
		const setField = (fieldName, cb) => {
			let f = form.getTextField(fieldName);
			f.setText(cb ? cb(data[fieldName]) : data[fieldName]);
			f.enableReadOnly();
		};
		setField("createdAt", (v) => formatDateToString(v));
		setField("validUntil", (v) => (v ? formatDateToString(v) : undefined));
		setField("clientName");
		setField("clientLocation");
		setField("clientContact");
		setField("clientID");
	},

	createProductTable: (data) => {
		let fixedHeight = 20;
		set((x) => ({
			...x,
			_PDFConfigs: { ...x._PDFConfigs, heightPointer: 540 },
		}));
		const mVertical = 30;
		let page = get()._PDFConfigs.currentPage;

		get().drawSubHeader(page.getY(), BudgetConfig.Titles.Table);
		page.moveDown(fixedHeight + 8);
		/**	Table header bg */
		const currentY = page.getY();
		page.drawRectangle({
			x: BudgetConfig.PDF.LayoutSizes.Margin.Left,
			y: currentY - 12,
			color: BudgetConfig.PDF.Colors.SubHeaderBG,
			height: currentY + 12,
			width: page.getWidth() - BudgetConfig.PDF.LayoutSizes.Margin.Left * 2,
		});
		page.drawText(BudgetConfig.TableHeader.Description, {
			x: BudgetConfig.PDF.LayoutSizes.Margin.Left + 2,
			size: BudgetConfig.PDF.FontSizes.MD,
		});
		page.drawText(BudgetConfig.TableHeader.Quantity, {
			x: 400,
			size: BudgetConfig.PDF.FontSizes.MD,
		});
		page.drawText(BudgetConfig.TableHeader.Subtotal, {
			x: 500,
			size: BudgetConfig.PDF.FontSizes.MD,
		});

		page.moveDown(fixedHeight + 12);

		data.list.forEach((item) => {
			if (page.getY() - fixedHeight < mVertical) page = get().addPage();

			page.drawText(item.description, {
				x: BudgetConfig.PDF.LayoutSizes.Margin.Left + 2,
				maxWidth: 250,
				size: BudgetConfig.PDF.FontSizes.SM,
			});
			page.drawText(item.quantity.toString(), {
				x: 400,
				size: BudgetConfig.PDF.FontSizes.SM,
			});

			// if (!data._onlyShowTotal) {
			// page.drawText(currencyIntl.format(item.subtotal), {
			// 	x: 500,
			// 	y: totalHeight,
			// 	size: BudgetConfig.PDF.FontSizes.SM,
			// });
			// }

			page.moveDown(fixedHeight);
		});
		if (page.getY() - fixedHeight < mVertical) page = get().addPage();

		page.moveDown(12);

		// Result footer
		page.drawRectangle({
			x: BudgetConfig.PDF.LayoutSizes.Margin.Left,
			color: BudgetConfig.PDF.Colors.SubHeaderBG,
			height: fixedHeight + 12,
			width: page.getWidth() - BudgetConfig.PDF.LayoutSizes.Margin.Left * 2,
		});
		page.drawText(BudgetConfig.Titles.BudgetTotal, {
			x: BudgetConfig.PDF.LayoutSizes.Margin.Left + 2,
			size: BudgetConfig.PDF.FontSizes.MD,
			color: BudgetConfig.PDF.Colors.SubHeaderText,
		});
		page.drawText(currencyIntl.format(data.total), {
			x: 400,
			size: BudgetConfig.PDF.FontSizes.MD,
		});
	},

	createFooter: (data) => {
		let page = get()._PDFConfigs.currentPage;
		const normalFont = get()._PDFConfigs.SegoeUINormalFont;
		const middleX = page.getWidth() / 2;

		// Footer height
		/**
		 * @function drawMiniSubHeader
		 * @param {string} text
		 * @param {number} xPos
		 * @returns {void}
		 */
		const drawMiniSubHeader = (
			text,
			xPos = BudgetConfig.PDF.LayoutSizes.Margin.Left + 2
		) => {
			page.drawText(text, {
				x: xPos,
				size: BudgetConfig.PDF.FontSizes.MD,
				font: get()._PDFConfigs.SegoeUIBoldFont,
			});
		};

		drawMiniSubHeader(BudgetConfig.TableFooter.Warranty);
		drawMiniSubHeader(BudgetConfig.TableFooter.WorkConditions, middleX);

		page.moveDown(16);
		page.setFontSize(BudgetConfig.PDF.FontSizes.SM);
		/** @type {[[string, number],[string, number]]} */
		const textAreas = [
			[data.warranty, BudgetConfig.PDF.LayoutSizes.Margin.Left + 2],
			[data.workCompletion, middleX],
		];
		let yParagraphPosition = page.getY();
		let maxLinesWritten = 0;
		for (const i of textAreas) {
			if (!i[0].length) continue;
			// if (get().hasReachedPageEnd()) page = get().addPage();
			let lines = get()._splitTextIntoLines(
				i[0],
				normalFont,
				BudgetConfig.PDF.FontSizes.SM,
				260
			);
			maxLinesWritten = Math.max(maxLinesWritten, lines.length);
			for (let l of lines) {
				page.drawText(l, {
					x: i[1],
					font: normalFont,
				});
				page.moveDown(BudgetConfig.PDF.FontSizes.SM + 2);
			}
			page.moveTo(i[1], yParagraphPosition); // Return to the top of the paragraph to continue writing next to it
		}
		// Paragraph finalized, continue writing below
		page.moveLeft(0);
		page.moveDown(maxLinesWritten * BudgetConfig.PDF.FontSizes.SM + 8);

		page.setFontSize(BudgetConfig.PDF.FontSizes.MD);
		drawMiniSubHeader(BudgetConfig.TableFooter.Important);

		page.moveDown(16);
		page.setFontSize(BudgetConfig.PDF.FontSizes.SM);
		const lines = get()._splitTextIntoLines(
			data.important,
			normalFont,
			BudgetConfig.PDF.FontSizes.SM,
			260
		);
		for (let i = 0; i < lines.length; i++) {
			page.drawText(lines[i], {
				x: BudgetConfig.PDF.LayoutSizes.Margin.Left + 2,
			});
			if (i !== lines.length - 1) {
				page.moveDown(BudgetConfig.PDF.FontSizes.SM + 2);
			}
			console.log(page.getY());
		}
		console.log(page.getY(), page.getHeight());
	},

	addPageEnumeration: () => {
		const pages = get()._PDFConfigs.currentPage.doc.getPages();
		for (let i = 0; i < pages.length; i++) {
			pages[i].drawText(`Página ${i + 1} de ${pages.length}`, {
				x: pages[i].getWidth() - BudgetConfig.PDF.LayoutSizes.Margin.Left * 3,
				y: 10,
				size: BudgetConfig.PDF.FontSizes.SM,
			});
		}
	},
	safeMoveDown: (yPos) => {
		const currentY = get()._PDFConfigs.currentPage.getY();
		if (currentY - yPos < BudgetConfig.PDF.LayoutSizes.Margin.Top) {
			const p = get().addPage();
			set((state) => ({
				_PDFConfigs: { ...state._PDFConfigs, currentPage: p },
			}));
			p.moveTo(0, p.getHeight());
		} else {
			get()._PDFConfigs.currentPage.moveDown(yPos);
		}
	},
	_splitTextIntoLines: (text, font, fontSize, maxWidth) => {
		const words = text.replace("\n", "").split(" ");
		const lines = [];
		let currentLine = "";

		for (const word of words) {
			const testLine = currentLine + (currentLine ? " " : "") + word;
			const width = font.widthOfTextAtSize(testLine, fontSize);

			if (width > maxWidth && currentLine.length > 0) {
				lines.push(currentLine);
				currentLine = word;
			} else {
				currentLine = testLine;
			}
		}

		if (currentLine.length > 0) {
			lines.push(currentLine);
		}

		return lines;
	},
}));

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
 * @typedef {Object} iTextOptions
 * @property {number} fontSize
 * @property {number} maxWidth
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
 * @property {(data: IBudgetForm) => Promise<void>} generatePDF
 * @property {()=> PDFPage} addPage
 * @property {(text: string, size?: number)=> void} drawSubHeader
 * @property {(yPos: number)=>void} drawTextDecoration
 * @property {(data: IBudgetForm)=> void} fillDefaultForm
 * @property {(data: IBudgetForm)=> void} createProductTable
 * @property {(data: IBudgetForm)=> void} createFooter
 * @property {()=> void} addPageEnumeration
 * @property {(amount: number)=> void} safeMoveDown
 * @property {(text: string, config: {xPos: number, font: PDFFont} & iTextOptions)=> number} drawSafeMultilineText
 * @property {(yAmount: number)=> boolean} willReachPageEnd
 * @property {(text: string, config: {font: PDFFont} & iTextOptions)=> string[]} _splitTextIntoLines
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

		currentPage.moveUp(540);
		get().createProductTable(data);

		get().safeMoveDown(28);
		get().drawSubHeader(BudgetConfig.Titles.Notes);

		get().safeMoveDown(24);
		get().drawSafeMultilineText(data.notes, {
			xPos: BudgetConfig.PDF.LayoutSizes.Margin.Left + 2,
			font: SegoeUINormalFont,
			fontSize: BudgetConfig.PDF.FontSizes.SM,
			maxWidth: Math.ceil(
				currentPage.getWidth() - BudgetConfig.PDF.LayoutSizes.Margin.Left * 2
			),
		});

		get().safeMoveDown(24);
		get().drawSubHeader(
			BudgetConfig.Titles.TsCs,
			BudgetConfig.PDF.FontSizes.LG
		);

		get().safeMoveDown(24);
		get().createFooter(data);

		get().addPageEnumeration();

		const bytes = await doc.save();
		const blob = new Blob([bytes], { type: "application/pdf" });
		window.open(URL.createObjectURL(blob));
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
		let page = get()._PDFConfigs.currentPage;
		const rectableBgWidth =
			page.getWidth() - BudgetConfig.PDF.LayoutSizes.Margin.Left * 2;

		get().drawSubHeader(BudgetConfig.Titles.Table);

		get().safeMoveDown(fixedHeight + 8);
		const drawTableHeader = () => {
			/**	Table header bg */
			page.drawRectangle({
				x: BudgetConfig.PDF.LayoutSizes.Margin.Left,
				y: page.getY() - 12,
				color: BudgetConfig.PDF.Colors.SubHeaderBG,
				height: fixedHeight + 12,
				width: rectableBgWidth,
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
		};
		drawTableHeader();
		get().safeMoveDown(fixedHeight + 12);

		data.list.forEach((item) => {
			if (get().willReachPageEnd(fixedHeight)) {
				page = get().addPage();
				// Draw another header on top of the new page until all items are printed
				get().safeMoveDown(BudgetConfig.PDF.LayoutSizes.Margin.Top);
				drawTableHeader();
			}

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

			get().safeMoveDown(fixedHeight);
		});
		// if (page.getY() - fixedHeight < BudgetConfig.PDF.LayoutSizes.Margin.Top) page = get().addPage();

		get().safeMoveDown(12);

		// Result footer
		page.drawRectangle({
			x: BudgetConfig.PDF.LayoutSizes.Margin.Left,
			y: page.getY() - 12,
			color: BudgetConfig.PDF.Colors.SubHeaderBG,
			height: fixedHeight + 12,
			width: 362, // Hardcoded to look good
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
		const textPaddingLeft = BudgetConfig.PDF.LayoutSizes.Margin.Left + 2;

		/**
		 * @function drawMiniSubHeader
		 * @param {string} text
		 * @param {number} xPos
		 * @returns {void}
		 */
		const drawMiniSubHeader = (text, xPos) => {
			page.drawText(text, {
				x: xPos,
				size: BudgetConfig.PDF.FontSizes.MD,
				font: get()._PDFConfigs.SegoeUIBoldFont,
			});
		};

		drawMiniSubHeader(BudgetConfig.TableFooter.Warranty, textPaddingLeft);
		drawMiniSubHeader(BudgetConfig.TableFooter.WorkConditions, middleX);

		get().safeMoveDown(16);
		page.setFont(normalFont);
		/** @type {[[string, number],[string, number]]} */
		const textAreas = [
			[data.warranty, textPaddingLeft],
			[data.workCompletion, middleX],
		];
		let yParagraphPosition = page.getY();
		let maxLinesWritten = [1];
		for (const i of textAreas) {
			if (!i[0].trim().length) continue;
			const generatedLines = get().drawSafeMultilineText(i[0], {
				xPos: i[1],
				font: normalFont,
				fontSize: BudgetConfig.PDF.FontSizes.SM,
				maxWidth: 260, // Arbitrary value
			});
			maxLinesWritten.push(generatedLines);
			// Return to the top of the paragraph to continue writing next to it
			page.moveTo(i[1], yParagraphPosition);
		}
		// Paragraph finalized, continue writing below
		page.moveLeft(0);
		const amountToMoveDown =
			Math.max(...maxLinesWritten) * BudgetConfig.PDF.FontSizes.SM + 8;
		get().safeMoveDown(amountToMoveDown);
		console.log(page.getY());
		drawMiniSubHeader(BudgetConfig.TableFooter.Important, textPaddingLeft);

		get().safeMoveDown(16);
		get().drawSafeMultilineText(data.important, {
			xPos: textPaddingLeft,
			font: normalFont,
			fontSize: BudgetConfig.PDF.FontSizes.SM,
			maxWidth: 260,
		});
	},

	addPage: () => {
		const nwP = get()._PDFConfigs.currentPage.doc.addPage();
		set((state) => ({
			...state,
			_PDFConfigs: { ...state._PDFConfigs, currentPage: nwP },
		}));

		return get()._PDFConfigs.currentPage;
	},

	drawSubHeader: (text, size = BudgetConfig.PDF.FontSizes.MD) => {
		let page = get()._PDFConfigs.currentPage;
		// 8 -> text decoration line
		// if (get().willReachPageEnd(size + 8)) get().safeMoveDown(size + 8);

		page.drawText(text, {
			x: BudgetConfig.PDF.LayoutSizes.Margin.Left + 2,
			size: size,
			color: BudgetConfig.PDF.Colors.SubHeaderText,
			font: get()._PDFConfigs.SegoeUIBoldFont,
		});
		get().drawTextDecoration(page.getY());
	},

	drawTextDecoration: (yPos) => {
		get()._PDFConfigs.currentPage.drawLine({
			thickness: 0.5,
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

	safeMoveDown: (amount) => {
		let page = get()._PDFConfigs.currentPage;
		console.log("safeM", amount);
		if (get().willReachPageEnd(amount)) {
			page = get().addPage();
			page.setLineHeight(12);
			page.moveTo(
				0,
				page.getHeight() - BudgetConfig.PDF.LayoutSizes.Margin.Top
			);
			set((state) => ({
				...state,
				_PDFConfigs: { ...state._PDFConfigs, currentPage: page },
			}));
		} else {
			page.moveDown(amount);
		}
	},

	drawSafeMultilineText: (text, config) => {
		const page = get()._PDFConfigs.currentPage;
		const lines = get()._splitTextIntoLines(text, config);
		for (let i = 0; i < lines.length; ++i) {
			page.drawText(lines[i], {
				x: config.xPos,
				size: config.fontSize,
			});
			if (i !== lines.length - 1) get().safeMoveDown(config.fontSize);
		}
		return lines.length;
	},

	willReachPageEnd: (yAmount) => {
		const page = get()._PDFConfigs.currentPage;
		return page.getY() - yAmount <= BudgetConfig.PDF.LayoutSizes.Margin.Top;
	},

	_splitTextIntoLines: (text, config) => {
		const words = text.replace("\n", "").split(" ");
		const lines = [];
		let currentLine = "";

		for (const word of words) {
			const testLine = currentLine + (currentLine ? " " : "") + word;
			const width = config.font.widthOfTextAtSize(testLine, config.fontSize);

			if (width > config.maxWidth && currentLine.length > 0) {
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

import { create } from "zustand";
import { BudgetConfig } from "#/constants/budget.config";
import { PDFDocument, PDFFont, PDFPage } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { useApiStore } from "./api.store";

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
 * @property {()=>void} drawTextDecoration
 * @property {(data: IBudgetForm, CLIENT_META: string)=> void} fillDefaultForm
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
			const subtotal = item.price * item.quantity;
			const discounted = subtotal - (subtotal * (item.discount || 0)) / 100;
			return acc + discounted;
		}, 0);
		return total;
	},

	_PDFConfigs: null,

	generatePDF: async (data) => {
		const budgetRes = await useApiStore.getState().GetBudgetPDF();
		if (!budgetRes) throw new Error();

		const doc = await PDFDocument.load(budgetRes.PDF);

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
		get().fillDefaultForm(data, budgetRes.CLIENT_META);

		currentPage.moveUp(540);
		get().createProductTable(data);

		get().safeMoveDown(20);
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

		get().safeMoveDown(12);
		get().drawSubHeader(
			BudgetConfig.Titles.TsCs,
			BudgetConfig.PDF.FontSizes.LG
		);

		get().safeMoveDown(24);
		get().createFooter(data);

		get().addPageEnumeration();

		doc.setAuthor("Daniel Patricio Becerra (dapabe)");
		doc.setCreationDate(new Date());
		const fileName = `CortinasBisbal_${data.clientName}`;
		doc.setTitle(fileName);

		const bytes = await doc.save();
		const blob = new Blob([bytes], { type: "application/pdf" });
		const url = URL.createObjectURL(blob);

		if (data._previsualize) window.open(url);
		else {
			const a = document.createElement("a");
			a.href = url;
			a.download = fileName;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}
		window.URL.revokeObjectURL(url);
	},

	fillDefaultForm: (data, CLIENT_META) => {
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

		data.createdAt.setDate(data.createdAt.getDate() + 1);
		if (data.validUntil) data.validUntil.setDate(data.validUntil.getDate() + 1);
		setField("createdAt", (v) => formatDateToString(v));
		setField("validUntil", (v) => (v ? formatDateToString(v) : undefined));
		setField("clientName");
		setField("clientLocation");
		setField("clientContact");
		setField("clientID");

		// const f = form.getTextField("clientMeta");
		// f.setText(CLIENT_META);
		// f.enableReadOnly();
	},

	createProductTable: (data) => {
		let fixedHeight = 20;
		let page = get()._PDFConfigs.currentPage;
		const rectableBgWidth =
			page.getWidth() - BudgetConfig.PDF.LayoutSizes.Margin.Left * 2;

		get().drawSubHeader(BudgetConfig.Titles.Table);

		get().safeMoveDown(fixedHeight + 8);
		const drawTableHeader = () => {
			const fontSize = BudgetConfig.PDF.FontSizes.MD;
			/**	Table header bg */
			page.drawRectangle({
				x: BudgetConfig.PDF.LayoutSizes.Margin.Left,
				color: BudgetConfig.PDF.Colors.SubHeaderBG,
				height: fontSize + 8,
				width: rectableBgWidth,
			});
			page.moveUp(6);
			page.drawText(BudgetConfig.TableHeader.Description, {
				x: BudgetConfig.PDF.LayoutSizes.Margin.Left + 2,
				size: fontSize,
			});
			page.drawText(BudgetConfig.TableHeader.Quantity, {
				x: 350,
				size: fontSize,
			});
			if (!data._onlyShowTotal) {
				page.drawText(BudgetConfig.TableHeader.Subtotal, {
					x: 450,
					size: fontSize,
				});
			}
			get().safeMoveDown(fontSize + 6);
		};
		drawTableHeader();
		data.list.forEach((item) => {
			const genLines = get()._splitTextIntoLines(
				item.description.trim().length ? item.description : "N/A",
				{
					font: get()._PDFConfigs.SegoeUINormalFont,
					fontSize: BudgetConfig.PDF.FontSizes.SM,
					maxWidth: 300,
				}
			);
			const rowSpacing = 4;
			const fontSize = BudgetConfig.PDF.FontSizes.SM;
			const rowHeight = genLines.length * fontSize + rowSpacing;

			// if the row doesn't fit
			if (get().willReachPageEnd(rowHeight + rowSpacing)) {
				page = get().addPage();
				drawTableHeader();
			}

			const initYRow = page.getY();

			for (const l of genLines) {
				page.drawText(l, {
					x: BudgetConfig.PDF.LayoutSizes.Margin.Left + 2,
					size: fontSize,
				});
				get().safeMoveDown(fontSize);
			}

			const offset = (rowHeight - fontSize) / 2;
			const yCentered = initYRow - offset;

			page.drawText(item.quantity.toString(), {
				x: 350,
				y: yCentered,
				size: fontSize,
			});

			if (!data._onlyShowTotal) {
				page.drawText(currencyIntl.format(item.subtotal), {
					x: 450,
					y: yCentered,
					size: fontSize,
				});
			}
			get().safeMoveDown(rowSpacing);
		});

		// Espacio después de la tabla y altura del resumen
		const paddingAfterTable = BudgetConfig.PDF.FontSizes.MD;
		const resumenHeight = BudgetConfig.PDF.FontSizes.MD + 12;
		if (get().willReachPageEnd(paddingAfterTable + resumenHeight)) {
			page = get().addPage();
		} else {
			get().safeMoveDown(resumenHeight);
		}

		page.drawRectangle({
			x: BudgetConfig.PDF.LayoutSizes.Margin.Left,
			color: BudgetConfig.PDF.Colors.SubHeaderBG,
			height: resumenHeight,
			width: 362, // Hardcoded to look good
		});
		page.moveUp(8);
		page.drawText(BudgetConfig.Titles.BudgetTotal, {
			x: BudgetConfig.PDF.LayoutSizes.Margin.Left + 2,
			size: BudgetConfig.PDF.FontSizes.MD,
			color: BudgetConfig.PDF.Colors.SubHeaderText,
		});
		const formatedTotal = data._onlyShowTotal
			? data.total - (data.total * data.totalDiscount) / 100
			: get().calculateTotal(data.list);
		page.drawText(currencyIntl.format(formatedTotal), {
			x: 400,
			size: BudgetConfig.PDF.FontSizes.MD,
		});
		get().safeMoveDown(8);
	},

	createFooter: (data) => {
		const page = get()._PDFConfigs.currentPage;
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
			get()._PDFConfigs.currentPage.drawText(text, {
				x: xPos,
				size: BudgetConfig.PDF.FontSizes.MD,
				font: get()._PDFConfigs.SegoeUIBoldFont,
			});
		};

		/**
		 * Probably will be better in the future to draw the whole subheader + paragraph in a single function
		 * and take into account the page break, so it drawn uniformly. Currently, if a page break happens
		 * between the subheader and the paragraph, the subheader will be at the bottom of the page and the paragraph
		 * at the top of the next one.
		 */
		// const topSubheaderHeight = BudgetConfig.PDF.FontSizes.MD * 2;
		let maxLinesWritten = [1];
		/** @type {[[string, number],[string, number]]} */
		const textAreas = [
			[data.warranty, textPaddingLeft],
			[data.workCompletion, middleX],
		];
		for (const element of textAreas) {
			const generatedLines = get()._splitTextIntoLines(element[0], {
				font: normalFont,
				fontSize: BudgetConfig.PDF.FontSizes.SM,
				maxWidth: 260, // Arbitrary value
			});
			maxLinesWritten.push(generatedLines.length);
		}
		// const blockHeight = topSubheaderHeight + Math.max(...maxLinesWritten) * 16;
		// if (get().willReachPageEnd(blockHeight)) get().safeMoveDown(blockHeight);
		drawMiniSubHeader(BudgetConfig.TableFooter.Warranty, textPaddingLeft);
		drawMiniSubHeader(BudgetConfig.TableFooter.WorkConditions, middleX);

		get().safeMoveDown(16);
		page.setFont(normalFont);

		let initialParagraphPosition = page.getY();
		for (const i of textAreas) {
			if (!i[0].trim().length) continue;
			get().drawSafeMultilineText(i[0], {
				xPos: i[1],
				font: normalFont,
				fontSize: BudgetConfig.PDF.FontSizes.SM,
				maxWidth: 260, // Arbitrary value
			});
			// Return to the top of the paragraph to continue writing next to it
			page.moveTo(i[1], initialParagraphPosition);
		}
		// Paragraph finalized, continue writing below
		page.moveLeft(page.getX());

		const amountToMoveDown = Math.max(...maxLinesWritten) * 16;
		get().safeMoveDown(amountToMoveDown);
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
		nwP.moveTo(0, nwP.getHeight() - BudgetConfig.PDF.LayoutSizes.Margin.Top);
		nwP.setLineHeight(12);
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
		get().safeMoveDown(8);
		get().drawTextDecoration();
		page.moveUp(7);
	},

	drawTextDecoration: () => {
		const p = get()._PDFConfigs.currentPage;
		p.drawLine({
			thickness: 0.5,
			color: BudgetConfig.PDF.Colors.SubHeaderText,
			start: {
				x: BudgetConfig.PDF.LayoutSizes.Margin.Left,
				y: p.getY(),
			},
			end: {
				x: p.getWidth() - BudgetConfig.PDF.LayoutSizes.Margin.Left,
				y: p.getY(),
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
		if (get().willReachPageEnd(amount)) {
			page = get().addPage();
		} else {
			page.moveDown(amount);
		}
	},

	drawSafeMultilineText: (text, config) => {
		let page = get()._PDFConfigs.currentPage;
		const lines = get()._splitTextIntoLines(text, config);
		for (let i = 0; i < lines.length; ++i) {
			if (get().willReachPageEnd(config.fontSize)) {
				page = get().addPage();
			}
			page.drawText(lines[i], {
				x: config.xPos,
				size: config.fontSize,
			});
			get().safeMoveDown(config.fontSize);
		}
		return lines.length;
	},

	willReachPageEnd: (yAmount) => {
		const page = get()._PDFConfigs.currentPage;
		return page.getY() - yAmount <= BudgetConfig.PDF.LayoutSizes.Margin.Top;
	},

	_splitTextIntoLines: (text, config) => {
		// Retain end of line jumps
		const paragraphs = text.split(/\r?\n/);
		const lines = [];
		for (const paragraph of paragraphs) {
			const words = paragraph.split(" ");
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
		}
		return lines;
	},
}));

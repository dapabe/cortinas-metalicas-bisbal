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
 * @typedef {Object} IBudgetStore
 * @property {number} _IVA
 * @property {(value: number) => string} formatCurrency
 * @property {(values: import("../schemas/BudgetForm.schema").IBudgetItem[]) => number} calculateTotal
 * @property {{
 * 	currentPage: PDFPage,
 * 	heightPointer: number,
 * 	SegoeUIBoldFont: PDFFont,
 * }} _PDFConfigs
 * @property {()=> PDFPage} addPage
 * @property {(yPos: number, text: string)=> void} drawSubHeader
 * @property {(yPos: number)=>void} drawTextDecoration
 * @property {(data: import("../schemas/BudgetForm.schema").IBudgetForm)=> number} createProductTable
 * @property {(data: import("../schemas/BudgetForm.schema").IBudgetForm) => void} generatePDF
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
	addPage: () => {
		const p = get()._PDFConfigs.currentPage;
		const currentIndex = p.doc.getPageIndices()[p.doc.getPageIndices().length];

		const nwP = p.doc.addPage();
		set({ _PDFConfigs: { currentPage: p, heightPointer: nwP.getHeight() } });

		const pages = nwP.doc.getPages();
		for (let i = currentIndex; i <= pages.length; i++) {
			pages[i].drawText(`Página ${currentIndex} de ${pages.length}`, {
				x: pages[i].getWidth() - BudgetConfig.PDF.LayoutSizes.Margin.Left * 2,
				y: pages[i].getHeight() - 30,
				size: BudgetConfig.PDF.FontSizes.SM,
			});
		}
		return nwP;
	},
	generatePDF: async (data) => {
		const templateBytes = await fetch("/CortinasBisbal-Plantilla2.pdf").then(
			(x) => x.arrayBuffer()
		);
		const doc = await PDFDocument.load(templateBytes);
		doc.registerFontkit(fontkit);
		const SegoeUIBoldFont = await doc.embedFont(
			await fetch("/Segoe UI Bold.ttf").then((x) => x.arrayBuffer())
		);
		set({
			_PDFConfigs: {
				SegoeUIBoldFont,
				currentPage: doc.getPages()[0],
				heightPointer: 540, // Free space from the 1st page
			},
		});
		const form = doc.getForm();
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

		let tableHeight = get().createProductTable(data);
		tableHeight -= 32;

		// if (tableHeight <= get()._PDFConfigs.currentPage.getHeight()) {
		// 	tableHeight = get()._PDFConfigs.currentPage.getHeight() - 30;
		// }
		get().drawSubHeader(tableHeight, BudgetConfig.Titles.Notes);
		const currentPage = get()._PDFConfigs.currentPage;

		tableHeight -= 24;
		currentPage.drawText(data.notes, {
			x: BudgetConfig.PDF.LayoutSizes.Margin.Left,
			y: tableHeight,
			size: BudgetConfig.PDF.FontSizes.SM,
		});

		tableHeight -= 24;
		get().drawSubHeader(tableHeight, BudgetConfig.Titles.TsCs);

		const bytes = await doc.save();
		const blob = new Blob([bytes], { type: "application/pdf" });
		window.open(URL.createObjectURL(blob));
	},

	drawSubHeader: (yPos, text) => {
		get()._PDFConfigs.currentPage.drawText(text, {
			x: BudgetConfig.PDF.LayoutSizes.Margin.Left + 2,
			y: yPos,
			size: BudgetConfig.PDF.FontSizes.MD,
			color: BudgetConfig.PDF.Colors.SubHeaderText,
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

	createProductTable: (data) => {
		let fixedHeight = 20;
		set((x) => ({
			...x,
			_PDFConfigs: { ...x._PDFConfigs, heightPointer: 540 },
		}));
		let totalHeight = get()._PDFConfigs.heightPointer;
		const mVertical = 30;
		let page = get()._PDFConfigs.currentPage;

		get().drawSubHeader(totalHeight, BudgetConfig.Titles.Table);
		totalHeight -= fixedHeight + 8;
		page.drawRectangle({
			x: BudgetConfig.PDF.LayoutSizes.Margin.Left,
			y: totalHeight - 12,
			color: BudgetConfig.PDF.Colors.SubHeaderBG,
			height: fixedHeight + 12,
			width: page.getWidth() - BudgetConfig.PDF.LayoutSizes.Margin.Left * 2,
		});

		page.drawText(BudgetConfig.TableHeader.Description, {
			x: BudgetConfig.PDF.LayoutSizes.Margin.Left + 2,
			y: totalHeight,
			size: BudgetConfig.PDF.FontSizes.MD,
		});
		page.drawText(BudgetConfig.TableHeader.Quantity, {
			x: 400,
			y: totalHeight,
			size: BudgetConfig.PDF.FontSizes.MD,
		});
		page.drawText(BudgetConfig.TableHeader.Subtotal, {
			x: 500,
			y: totalHeight,
			size: BudgetConfig.PDF.FontSizes.MD,
		});

		totalHeight -= fixedHeight + 12;

		data.list.forEach((item) => {
			if (totalHeight - fixedHeight < mVertical) page = get().addPage();

			page.drawText(item.description, {
				x: BudgetConfig.PDF.LayoutSizes.Margin.Left + 2,
				y: totalHeight,
				maxWidth: 250,
				size: BudgetConfig.PDF.FontSizes.SM,
			});
			page.drawText(item.quantity.toString(), {
				x: 400,
				y: totalHeight,
				size: BudgetConfig.PDF.FontSizes.SM,
			});

			// if (!data._onlyShowTotal) {
			// page.drawText(currencyIntl.format(item.subtotal), {
			// 	x: 500,
			// 	y: totalHeight,
			// 	size: BudgetConfig.PDF.FontSizes.SM,
			// });
			// }

			totalHeight -= fixedHeight;
		});
		if (totalHeight - fixedHeight < mVertical) page = get().addPage();

		totalHeight -= 12;

		// Result footer
		page.drawRectangle({
			x: BudgetConfig.PDF.LayoutSizes.Margin.Left,
			y: totalHeight - 12,
			color: BudgetConfig.PDF.Colors.SubHeaderBG,
			height: fixedHeight + 12,
			width: page.getWidth() - BudgetConfig.PDF.LayoutSizes.Margin.Left * 2,
		});
		page.drawText(BudgetConfig.Titles.BudgetTotal, {
			x: BudgetConfig.PDF.LayoutSizes.Margin.Left + 2,
			y: totalHeight,
			size: BudgetConfig.PDF.FontSizes.MD,
			color: BudgetConfig.PDF.Colors.SubHeaderText,
		});
		page.drawText(currencyIntl.format(data.total), {
			x: 400,
			y: totalHeight,
			size: BudgetConfig.PDF.FontSizes.MD,
		});

		return totalHeight;
	},
}));

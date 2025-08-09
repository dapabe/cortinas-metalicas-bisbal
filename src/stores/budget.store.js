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
 * 	SegoeUIBoldFont: PDFFont,
 * }} _PDFConfigs
 * @property {(page: PDFPage, data: import("../schemas/BudgetForm.schema").IBudgetForm)=> number} createProductTable
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
	minimumFractionDigits: 2,
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
		set({ _PDFConfigs: { SegoeUIBoldFont } });
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

		// setField("total", (v) => currencyIntl.format(parseInt(v)));
		// setField("notes");
		// setField("warranty");
		// setField("workCompletion");
		// setField("important");

		const firstPage = doc.getPages()[0];

		const tableHeight = get().createProductTable(firstPage, data);
		// const calculatedHeight = 200 - tableHeight;

		const textWithMargin = BudgetConfig.PDF.LayoutSizes.Margin.Left + 2;

		// [
		// 	{ txt: BudgetConfig.Titles.Notes, y: 250 },
		// 	// { txt: "RESUMEN DEL PRESUPUESTO", y: 200 },
		// 	{ txt: BudgetConfig.Titles.TsCs, y: 150 },
		// ].forEach((x) => {
		// 	firstPage.drawText(x.txt, {
		// 		x: textWithMargin,
		// 		y: x.y - calculatedHeight,
		// 	});
		// });

		const bytes = await doc.save();
		const blob = new Blob([bytes], { type: "application/pdf" });
		window.open(URL.createObjectURL(blob));
	},

	createProductTable: (page, data) => {
		let fixedHeight = 20;
		let initialHeight = 500;
		let totalHeight = initialHeight;

		page.drawRectangle({
			x: BudgetConfig.PDF.LayoutSizes.Margin.Left,
			y: totalHeight - 12,
			color: rgb(0.92, 0.94, 0.96),
			height: fixedHeight + 12,
			width: page.getWidth() - BudgetConfig.PDF.LayoutSizes.Margin.Left * 2,
		});
		page.drawLine({
			thickness: 0.5,
			start: {
				x: BudgetConfig.PDF.LayoutSizes.Margin.Left,
				y: totalHeight - 12,
			},
			end: {
				x: page.getWidth() - BudgetConfig.PDF.LayoutSizes.Margin.Left,
				y: totalHeight - 12,
			},
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

		data.list.forEach((item, idx) => {
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
			page.drawText(currencyIntl.format(item.subtotal), {
				x: 500,
				y: totalHeight,
				size: BudgetConfig.PDF.FontSizes.SM,
			});
			totalHeight -= fixedHeight;
		});
		totalHeight -= 12;
		page.drawRectangle({
			x: BudgetConfig.PDF.LayoutSizes.Margin.Left,
			y: totalHeight - 12,
			color: rgb(0.92, 0.94, 0.96),
			height: fixedHeight + 12,
			width: page.getWidth() - 232,
		});
		page.drawText(BudgetConfig.Titles.BudgetTotal, {
			x: BudgetConfig.PDF.LayoutSizes.Margin.Left + 2,
			y: totalHeight,
			size: BudgetConfig.PDF.FontSizes.MD,
		});
		page.drawText(currencyIntl.format(data.total), {
			x: 400,
			y: totalHeight,
			size: BudgetConfig.PDF.FontSizes.MD,
		});

		return totalHeight;
	},
}));

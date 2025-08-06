import { create } from "zustand";
import { BudgetConfig } from "#/constants/budget.config";
import { PDFDocument } from "pdf-lib";

/**
 * @typedef {Object} IBudgetStore
 * @property {number} _IVA;
 * @property {(value: number) => string} formatCurrency
 * @property {(values: IBudgetItem[]) => number} calculateTotal
 * @property {(data: import("#/schemas/BudgetForm.schema").IBudgetForm) => void} generatePDF
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
export const useBudgetStore = create((_, get) => ({
	_IVA: 1.21, // 21% IVA
	formatCurrency: (value) => currencyIntl.format(value),
	calculateTotal: (values) => {
		let total = values.reduce((acc, item) => {
			const subtotal = acc + item.price * item.quantity;
			return subtotal - (subtotal * item.discount) / 100;
		}, 0);
		return total;
	},
	generatePDF: async (data) => {
		const templateBytes = await fetch("/CortinasBisbal-Plantilla.pdf").then(
			(x) => x.arrayBuffer()
		);
		let doc = await PDFDocument.load(templateBytes);
		const form = doc.getForm();
		/**
		 * @param {string} fieldName
		 * @param {(value: any) => string|null} cb
		 */
		const setField = (fieldName, cb = null) => {
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

		setField("total", (v) => currencyIntl.format(parseInt(v)));
		setField("notes");
		const bytes = await doc.save();
		const blob = new Blob([bytes], { type: "application/pdf" });
		window.open(URL.createObjectURL(blob));
	},
}));

import { create } from "zustand";
import { jsPDF } from "jspdf";

/**
 * @typedef {Object} IBudgetStore
 * @property {number} _IVA;
 * @property {number} subtotal
 * @property {number} total
 * @property {IBudgetItem[]} budget
 * @property {(value: number) => string} formatCurrency
 * @property {() => IBudgetTotal} calculateTotal
 * @property {() => void} generatePDF
 */

const currencyIntl = new Intl.NumberFormat("es-AR", {
	style: "currency",
	currency: "ARS",
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

/**
 * @type {import("zustand").UseBoundStore<import("zustand").StoreApi<IBudgetStore>>}
 */
export const useBudgetStore = create((set, get) => ({
	_IVA: 1.21, // 21% IVA
	subtotal: 0,
	total: 0,
	budget: [],
	formatCurrency: (value) => currencyIntl.format(value),
	calculateTotal: () => {
		let total = get().budget.reduce((acc, item) => {
			return acc + item.price * item.quantity;
		}, get().total);
	},
	generatePDF: () => {
		const doc = new jsPDF({
			orientation: "portrait",
			unit: "mm",
			format: "a4",
		});
		doc.setFont("Helvetica", "normal");
		doc.setFontSize(12);
		doc.text("Presupuesto", 10, 10);
		doc.text(`Subtotal: ${get().formatCurrency(get().subtotal)}`, 10, 20);
		doc.text(
			`IVA: ${get().formatCurrency(get().subtotal * (get()._IVA - 1))}`,
			10,
			30
		);
		doc.text(`Total: ${get().formatCurrency(get().total)}`, 10, 40);

		get().budget.forEach((item, index) => {
			doc.text(
				`${item.name}: ${get().formatCurrency(item.price)} x ${item.quantity}`,
				10,
				50 + index * 10
			);
		});

		const simpleDate = new Date().toLocaleDateString("es-AR", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		});

		doc.save(`cortinasbisbal-presupuesto-${simpleDate}.pdf`);
	},
}));

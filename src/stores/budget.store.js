import { create } from "zustand";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import { BudgetConfig } from "#/constants/budget.config";

/**
 * @typedef {Object} IBudgetStore
 * @property {number} _IVA;
 * @property {(value: number) => string} formatCurrency
 * @property {(values: IBudgetItem[]) => number} calculateTotal
 * @property {(data: import("#/components/pages/backoffice/BudgetTable.form").IBudgetForm) => void} generatePDF
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
	generatePDF: (data) => {
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

		autoTable(doc, {
			head: [Object.values(BudgetConfig.Titles)],
			body: data.list.map((x) => [
				x.description,
				x.quantity,
				get().formatCurrency(x.price),
			]),
		});

		const simpleDate = new Date().toLocaleDateString("es-AR", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		});

		// doc.autoPrint({ variant: "javascript" });
		doc.output("dataurlnewwindow");
		// doc.save(`cortinasbisbal-presupuesto-${simpleDate}.pdf`);
	},
}));

import { create } from "zustand";

/**
 * @typedef {Object} IBudgetStore
 * @property {number} _IVA;
 * @property {number} subtotal
 * @property {number} total
 * @property {IBudgetItem[]} budget
 * @property {(value: number) => string} formatCurrency
 * @property {() => IBudgetTotal} calculateTotal
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
		for (const item of get().budget) {
			// item.
		}
	},
}));

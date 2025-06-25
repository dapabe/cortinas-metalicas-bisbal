import { create } from "zustand";

/**
 * @typedef {Object} IToastStore
 * @property {IToast[]} toasts
 * @property {(toast: Omit<IToast,"id">) => void} addToast
 * @property {(id: string) => void} removeToast
 */

/**
 * @type {import("zustand").UseBoundStore<import("zustand").StoreApi<IToastStore>>}
 */
export const useToastStore = create((set) => ({
	toasts: [],
	addToast: (toast) => {
		const id = Math.random().toString(36).substring(2, 9);

		set((state) => ({
			toasts: [...state.toasts, { ...toast, id }],
		}));

		// Delete after 5 seconds
		setTimeout(() => useToastStore.getState().removeToast(id), 5000);
	},
	removeToast: (id) => {
		set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
	},
}));

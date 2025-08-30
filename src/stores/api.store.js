import { create } from "zustand";
import { useToastStore } from "./toaster.store";

/**
 * @typedef {Object} IApiStore
 * @prop {string} basePath
 * @prop {(pathname: string) => Promise<Response>} _GET
 * @prop {(pathname: string, data?: any) => Promise<Response>} _POST
 * @prop {(res: Response) => Promise<boolean>} _handleResponse
 * @prop {(data: IDashboard)=> Promise<boolean>} LogIn
 * @prop {() => Promise<boolean>} LogOut
 * @prop {(data: IMessage) => Promise<void>} SendReview
 * @prop {() => Promise<false | {PDF: ArrayBuffer, CLIENT_META: string}>} GetBudgetPDF
 */

const toast = useToastStore.getState();

/**
 * @type {import("zustand").UseBoundStore<import("zustand").StoreApi<IApiStore>>}
 */
export const useApiStore = create((set, get) => ({
	basePath: "/api",
	_GET: (pathname) => {
		return fetch(get().basePath + pathname, {
			method: "GET",
		});
	},
	_POST: (pathname, data) => {
		return fetch(get().basePath + pathname, {
			method: "POST",
			body: data ? JSON.stringify(data) : undefined,
		});
	},
	_handleResponse: async (res) => {
		const api = await res.json();
		if (!res.ok || res.status !== 200) {
			if (res.status == 500) {
				toast.addToast({ status: "error", content: api.message });
			}

			toast.addToast({ status: "warning", content: api.message });
			return false;
		}
		if (api?.message)
			toast.addToast({ status: "success", content: api.message });

		return true;
	},

	LogIn: async (data) => {
		const res = await get()._POST("/login", data);
		return await get()._handleResponse(res);
	},
	LogOut: async () => {
		const res = await get()._POST("/logout");
		return await get()._handleResponse(res);
	},
	SendReview: async (data) => {
		const res = await get()._POST("/send-review", data);
		await get()._handleResponse(res);
	},
	GetBudgetPDF: async () => {
		const res = await get()._GET("/get-budget");
		const cloned = res.clone();

		const hasResponse = async () => {
			try {
				return await res.json();
			} catch (_) {
				return null;
			}
		};

		const api = await hasResponse();
		if (!res.ok || res.status !== 200) {
			if (res.status == 500) {
				api && toast.addToast({ status: "error", content: api.message });
			}
			api && toast.addToast({ status: "warning", content: api.message });
			return false;
		}

		return {
			PDF: await cloned.arrayBuffer(),
			CLIENT_META: res.headers.get("X-PDF-Metadata"),
		};
	},
}));

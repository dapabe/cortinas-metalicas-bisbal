"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useImagePreview() {
	const sp = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const currentImagePath = sp.get("preview");

	const createQueryStrings = useCallback(
		(value) => {
			const params = new URLSearchParams(sp.toString());
			params.set("preview", value);
			return params.toString();
		},
		[sp]
	);

	const setCurrentImagePath = (path) => {
		const params = new URLSearchParams(sp.toString());
		params.set("preview", path);
		router.push(pathname + "?" + createQueryStrings(path));
	};

	const closePreview = () => {
		const params = new URLSearchParams(sp.toString());
		params.delete("preview");
		router.push(pathname);
	};

	return {
		currentImagePath,
		setCurrentImagePath,
		closePreview,
	};
}

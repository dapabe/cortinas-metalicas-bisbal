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
		router.replace(pathname + "?" + createQueryStrings(path), {
			scroll: false,
		});
	};

	const closePreview = () => {
		const params = new URLSearchParams(sp.toString());
		params.delete("preview");
		router.replace(pathname, { scroll: false });
	};

	return {
		currentImagePath,
		setCurrentImagePath,
		closePreview,
	};
}

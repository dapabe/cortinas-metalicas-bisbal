"use client";
import { useToastStore } from "#/stores/toaster.store";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";

/**
 * @component
 * @param {{phoneNumber: string}} props
 * @returns {JSX.Element}
 */
export function CopyPhoneNumber({ phoneNumber }) {
	const toast = useToastStore();
	const copy = useMemo(
		() => [...phoneNumber].map((x, i) => <span key={i}>{x || "&#160;"}</span>),
		[phoneNumber]
	);

	return (
		<button
			className="btn btn-ghost gap-x-2 tooltip tooltip-bottom tooltip-info"
			data-tip="Copiar al portapapeles"
			onClick={() => {
				toast.addToast({
					status: "info",
					content: "Número copiado al portapapeles",
				});
				navigator.clipboard.writeText(phoneNumber.trim());
			}}
		>
			<div>+ {copy}</div>
			<ClipboardIcon className="size-6 inline-block" />
		</button>
	);
}

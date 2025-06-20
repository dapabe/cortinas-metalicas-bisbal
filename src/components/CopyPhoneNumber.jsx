"use client";
import { useMemo } from "react";

/**
 * @component
 * @param {{phoneNumber: string}} props
 * @returns {JSX.Element}
 */
export function CopyPhoneNumber({ phoneNumber }) {
	const copy = useMemo(
		() => [...phoneNumber].map((x, i) => <span key={i}>{x || "&#160;"}</span>),
		[phoneNumber]
	);

	return (
		<button
			className="btn btn-ghost gap-x-0 tooltip tooltip-bottom tooltip-info"
			data-tip="Copiar al portapapeles"
			onClick={() => {
				navigator.clipboard.writeText(phoneNumber.trim());
			}}
		>
			<div>+ {copy}</div>
		</button>
	);
}

"use client";
import { useState } from "react";

/**
 * @component
 * @param {import("react").PropsWithChildren<{ title: React.ReactNode}>} props
 * @returns {JSX.Element}
 */
export function Accordion({ title, children }) {
	const [check, setCheck] = useState(false);
	return (
		<div className="join-item collapse collapse-arrow bg-base-200 border border-base-300">
			<input
				type="radio"
				checked={check}
				onChange={() => setCheck((x) => !x)}
			/>
			<h3 className="collapse-title font-semibold">{title}</h3>
			<p className="collapse-content text-sm">{children}</p>
		</div>
	);
}

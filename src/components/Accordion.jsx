"use client";
import { useState } from "react";

/**
 * @component
 * @param {{ title: React.ReactNode, desc: React.ReactNode}} props
 * @returns {JSX.Element}
 */
export function Accordion({ title, desc }) {
	const [check, setCheck] = useState(false);
	return (
		<div className="join-item collapse collapse-arrow bg-base-200 border border-base-300">
			<input
				type="radio"
				checked={check}
				onChange={() => setCheck((x) => !x)}
			/>
			<h3 className="collapse-title font-semibold">{title}</h3>
			<p className="collapse-content text-sm">{desc}</p>
		</div>
	);
}

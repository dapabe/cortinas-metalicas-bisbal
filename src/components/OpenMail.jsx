"use client";

import { useMemo } from "react";

/**
 * @component
 * @param {{
 *  email: string
 * }} props
 * @returns {JSX.Element}
 */
export function OpenMail({ email }) {
	// No email grabbers
	const emailSpan = useMemo(
		() => [...email].map((x, i) => <span key={i}>{x}</span>),
		[]
	);

	const openMail = () => {
		const a = document.createElement("a");
		a.href = `mailto:${email}`;
		a.click();
		a.remove();
	};

	return (
		<button type="button" onClick={openMail} className="link link-hover">
			{emailSpan}
		</button>
	);
}

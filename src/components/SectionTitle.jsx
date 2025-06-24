"use client";
import { LinkIcon } from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";

/**
 * @component
 * @param {import("react").PropsWithChildren<{
 *	anchorSectionName: string
 * 	className?: string
 * }>} props
 * @returns {JSX.Element}
 */
export function SectionTitle({ anchorSectionName, className, children }) {
	const copyUrl = async () =>
		await navigator.clipboard.writeText(
			window.location.origin + `/#${anchorSectionName}`
		);
	return (
		<h2
			className={twMerge(
				"group relative text-center text-3xl font-semibold hover:cursor-pointer",
				className
			)}
			onClick={copyUrl}
		>
			<LinkIcon
				tabIndex={-1}
				className="inline-block size-6 group-hover:opacity-100 transition-opacity lg:opacity-0 mr-4 text-info"
			/>

			{children}
		</h2>
	);
}

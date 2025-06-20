import { twMerge } from "tailwind-merge";

/**
 * @component
 * @param {import("react").PropsWithChildren<{className?: string}>} props
 * @returns {JSX.Element}
 */
export function SectionTitle({ className, children }) {
	return (
		<h2 className={twMerge("text-center text-3xl font-semibold", className)}>
			{children}
		</h2>
	);
}

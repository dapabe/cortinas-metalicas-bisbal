/**
 * @component
 * @param {import("react").PropsWithChildren} props
 * @returns {JSX.Element}
 */
export function SectionTitle({ children }) {
	return (
		<h2 className="text-center sm:text-left text-3xl font-semibold">
			{children}
		</h2>
	);
}

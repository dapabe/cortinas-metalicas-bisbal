import Link from "next/link";

/** @type {import("next").Metadata} */
export const metadata = {
	title: "Backoffice - Cortinas Metalicas Bisbal",
};

export default async function Layout({ children }) {
	return (
		<div className="flex flex-col min-h-screen">
			<header className="bg-info text-white p-4 print:hidden">
				<Link href={"/"} className="text-2xl font-bold">
					CortinasBisbal - Backoffice
				</Link>
			</header>
			<div className="flex-1 flex flex-col p-4">{children}</div>
		</div>
	);
}

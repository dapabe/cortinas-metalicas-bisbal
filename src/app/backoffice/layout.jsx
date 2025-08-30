import { LogOut } from "#/components/pages/backoffice/LogOut";

/** @type {import("next").Metadata} */
export const metadata = {
	title: "Backoffice - Cortinas Metálicas Bisbal",
};

export default async function Layout({ children }) {
	return (
		<div className="flex flex-col min-h-screen">
			<header className="bg-info text-white p-4 flex justify-between">
				<h1 className="text-2xl font-bold">CortinasBisbal - Backoffice</h1>
				<div>
					<LogOut />
				</div>
			</header>
			<div className="flex-1 flex flex-col p-4">{children}</div>
		</div>
	);
}

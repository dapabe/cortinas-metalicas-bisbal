/** @type {import("next").Metadata} */
export const metadata = {
	title: "Backoffice - Cortinas Metálicas Bisbal",
};

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
	// // No proteger la ruta de login
	// const pathname =
	// 	typeof window === "undefined"
	// 		? require("next/navigation").usePathname?.() ?? ""
	// 		: "";
	// // En App Router, layout.jsx se ejecuta en el server, así que usamos cookies de next/headers
	// const cookieStore = await cookies();
	// const isAuth = cookieStore.get("backoffice_auth")?.value === "1";

	// // Si no está autenticado y no está en /backoffice/login, redirigir
	// // NOTA: pathname no está disponible en server, pero layout.jsx de /backoffice/login no usa este layout
	// if (!isAuth) {
	// 	redirect("/backoffice/login");
	// }

	return (
		<div className="flex flex-col min-h-screen">
			<header className="bg-info text-white p-4 print:hidden">
				<h1 className="text-2xl font-bold">CortinasBisbal - Backoffice</h1>
			</header>
			<div className="flex-1 flex flex-col p-4">{children}</div>
		</div>
	);
}

import { getSession } from "#/app/lib/session";
import { NextResponse } from "next/server";
import fs from "node:fs";
import fss from "node:fs/promises";
import path from "node:path";

export async function GET() {
	try {
		const { authenticated } = await getSession();
		if (!authenticated) {
			return NextResponse.json(
				{ message: "Inicie sesión para acceder a este recurso" },
				{ status: 401 }
			);
		}
		const filePath = path.resolve(
			process.cwd(),
			"src",
			"assets",
			"budgetTemplate.pdf"
		);

		if (!fs.existsSync(filePath)) {
			return NextResponse.json(
				{ message: "Plantilla no encontrada" },
				{ status: 404 }
			);
		}
		const fileBuffer = await fss.readFile(filePath);

		return new NextResponse(fileBuffer, {
			headers: {
				"Content-Type": "application/pdf",
				"Content-Disposition": `inline; filename="template.pdf"`,
				"X-Content-Type-Options": "nosniff",
				"X-Frame-Options": "DENY", // Evitar iframing
				"Cache-Control":
					"no-store, no-cache, must-revalidate, proxy-revalidate",
				Pragma: "no-cache",
				Expires: "0",
			},
		});
	} catch (error) {
		console.error("Error al enviar PDF: ", error);
		return NextResponse.json({ message: "Error de servidor" }, { status: 500 });
	}
}

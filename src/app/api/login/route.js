import { setSession } from "#/app/lib/session";
import { DashboardPasswordSchema } from "#/schemas/DashboardPassword.schema";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**	@param {NextRequest} req */
export async function POST(req) {
	try {
		const body = await req.json();
		const parsed = await DashboardPasswordSchema.parseAsync(body);

		if (parsed.password === process.env.BACKOFFICE_PASSWORD) {
			await setSession();
			return NextResponse.json({ success: true });
		} else {
			return NextResponse.json(
				{ message: "Contraseña Incorrecta" },
				{ status: 401 }
			);
		}
	} catch (error) {
		console.error(`Error al iniciar sesion: ${JSON.stringify(error)}`);

		if (error instanceof ZodError) {
			const serverErrors = Object.fromEntries(
				error.issues.map((issue) => [issue.path[0], issue.message])
			);
			return NextResponse.json({ errors: serverErrors }, { status: 400 });
		}

		return NextResponse.json({ message: "Error de servidor" }, { status: 500 });
	}
}

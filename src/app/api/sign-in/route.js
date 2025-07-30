import { DashboardPasswordSchema } from "#/schemas/DashboardPassword.schema";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

/** @param {Request} req */
export async function POST(req) {
	try {
		const body = await req.json();
		const data = await DashboardPasswordSchema.parseAsync(body);

		if (data.password !== process.env.DASHBOARD_PASSWORD) {
			return NextResponse.json(
				{
					success: true,
					message: "Contraseña incorrecta, inténtelo de nuevo",
				},
				{ status: 401 }
			);
		}

		return NextResponse.json(
			{
				success: true,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Password validation error:", JSON.stringify(error));

		if (error instanceof ZodError) {
			const serverErrors = Object.fromEntries(
				error.issues.map((issue) => [issue.path[0], issue.message])
			);

			return NextResponse.json(
				{ success: false, errors: serverErrors },
				{ status: 400 }
			);
		}

		// Generic server error
		return NextResponse.json(
			{
				success: false,
				message: "Ha ocurrido un error inesperado, inténtelo más tarde",
			},
			{ status: 500 }
		);
	}
}

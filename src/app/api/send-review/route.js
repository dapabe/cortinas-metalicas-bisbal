import { MessageReviewSchema } from "#/schemas/MessageReview.schema";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import emailjs, { EmailJSResponseStatus } from "@emailjs/nodejs";

/** @param {Request} req */
export async function POST(req) {
	try {
		const body = await req.json();
		const template = await MessageReviewSchema.parseAsync(body);
		template.env = process.env.NODE_ENV;
		// // Rate limiting check could be added here

		const res = await emailjs.send(
			process.env.EMAILJS_SERVICE_ID,
			process.env.EMAILJS_TEMPLATE_ID,
			template,
			{
				publicKey: process.env.EMAILJS_PUBLIC_KEY,
				privateKey: process.env.EMAILJS_PRIVATE_KEY,
			}
		);

		if (res.status !== 200) throw res;

		return NextResponse.json(
			{ success: true, message: "¡Gracias por tu reseña!" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Email sending error:", error);

		// Zod validation errors
		if (error instanceof ZodError) {
			const serverErrors = Object.fromEntries(
				error.issues.map((issue) => [issue.path[0], issue.message])
			);

			return NextResponse.json(
				{ success: false, errors: serverErrors },
				{ status: 400 }
			);
		}

		// EmailJS specific errors
		if (error instanceof EmailJSResponseStatus) {
			return NextResponse.json(
				{
					success: false,
					message:
						"Ha ocurrido un error al enviar el mensaje, inténtelo mas tarde",
					error: error.message,
				},
				{ status: error?.status ?? 500 }
			);
		}

		// Generic server error
		return NextResponse.json(
			{
				success: false,
				message: "Ha ocurrido un error, contacte con el desarrollador",
			},
			{ status: 500 }
		);
	}
}

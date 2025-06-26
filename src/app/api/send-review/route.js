import { MessageReviewSchema } from "#/schemas/MessageReview.schema";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import emailjs, { EmailJSResponseStatus } from "@emailjs/nodejs";

/** @param {Request} req */
export async function POST(req) {
	try {
		const body = await req.json();
		const template = await MessageReviewSchema.parseAsync(body);

		const res = await emailjs.send(
			process.env.EMAILJS_SERVICE_ID,
			process.env.EMAILJS_TEMPLATE_ID,
			template,
			{
				publicKey: process.env.EMAILJS_PUBLIC_KEY,
				privateKey: process.env.EMAILJS_PRIVATE_KEY,
				limitRate: {
					id: "app",
					// 1 request per minute
					throttle: 60_000,
				},
			}
		);

		if (res.status !== 200) throw res;

		return NextResponse.json(
			{
				success: true,
				message: "¡Gracias por tu reseña, la veremos en la brevedad!",
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Email sending error:", JSON.stringify(error));

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
				},
				{ status: error.status }
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

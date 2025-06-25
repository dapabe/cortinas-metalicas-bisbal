import { MessageReviewSchema } from "#/schemas/MessageReview.schema";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import nodemailer from "nodemailer";

/** @param {Request} req */
export async function POST(req) {
	try {
		const body = await req.json();
		const template = await MessageReviewSchema.parseAsync(body);

		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				type: "OAuth2",
				user: process.env.MAIL_USER,
				accessToken: process.env.MAIL_TOKEN,
			},
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		if (error instanceof EmailJSResponseStatus) {
			return new Response("Ha ocurrido un error, intentelo más tarde.", {
				status: error.status,
				statusText: error.text,
			});
		}
		if (error instanceof ZodError) {
			const serverErrors = Object.fromEntries(
				error?.issues?.map((issue) => [issue.path[0], issue.message]) || []
			);

			return NextResponse.json({ success: false, errors: serverErrors });
		}
		return NextResponse.json({ success: false });
	}
}

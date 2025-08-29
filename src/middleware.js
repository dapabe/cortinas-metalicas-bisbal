import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./app/lib/session";

/**
 * @param {NextRequest} req
 */
export async function middleware(req) {
	const session = await getSession();
	const path = req.nextUrl.pathname;
	const isLoginPage = path === "/login";

	if (!session.authenticated && path.startsWith("/backoffice"))
		return NextResponse.redirect(new URL("/login", req.url));

	if (session.authenticated && isLoginPage)
		return NextResponse.redirect(new URL("/backoffice", req.url));

	return NextResponse.next();
}

/** @type {import("next/server").MiddlewareConfig} */
export const config = {
	matcher: ["/backoffice/:path*", "/login"],
};

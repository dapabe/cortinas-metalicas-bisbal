import { sealData, unsealData } from "iron-session";
import { cookies } from "next/headers";

const sessionPassword = process.env.SESSION_SECRET;

/**
 *
 * @returns {Promise<{authenticated: boolean}>}
 */
export async function getSession() {
	const encryptedSession = (await cookies()).get("backoffice_session")?.value;
	if (!encryptedSession) return { authenticated: false };

	const session = await unsealData(encryptedSession, {
		password: sessionPassword,
	});
	return session;
}

export async function setSession() {
	const encryptedSession = await sealData(
		{ authenticated: true },
		{
			password: sessionPassword,
		}
	);
	(await cookies()).set("backoffice_session", encryptedSession, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 60 * 60 * 24 * 7, // 1 semana
		path: "/",
	});
}

export async function clearSession() {
	(await cookies()).delete("backoffice_session");
}

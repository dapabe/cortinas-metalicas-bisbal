import { clearSession } from "#/app/lib/session";
import { NextResponse } from "next/server";

export async function POST() {
	try {
		await clearSession();
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error({ error });
		return NextResponse.json({ message: "Error de servidor" }, { status: 500 });
	}
}

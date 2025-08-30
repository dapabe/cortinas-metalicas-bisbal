"use client";
import { useApiStore } from "#/stores/api.store";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogOut() {
	const [isLoading, setLoading] = useState(false);
	const Api = useApiStore();
	const router = useRouter();

	const logOut = async () => {
		setLoading(true);
		await Api.LogOut();
		router.refresh();
		setLoading(false);
	};

	return (
		<button
			type="button"
			disabled={isLoading}
			onClick={logOut}
			className="btn btn-outline btn-neutral"
		>
			<ArrowLeftEndOnRectangleIcon className="size-6" />
			Cerrar Sesión
		</button>
	);
}

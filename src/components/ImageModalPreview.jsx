"use client";
import { useImagePreview } from "#/hooks/useImagePreview";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { workImagePaths } from "#/constants/workImagePaths";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function ImageModalPreview() {
	const router = useRouter();
	const pathname = usePathname();
	const sp = useSearchParams();

	const currentImagePath = sp.get("preview");
	const closePreview = () => router.replace(pathname, { scroll: false });

	return (
		<dialog
			className="modal p-2"
			open={!!currentImagePath}
			onClose={closePreview}
		>
			<div className="modal-box flex flex-col w-full max-w-3xl max-h-screen h-full p-2">
				<div className="relative flex-1">
					{currentImagePath ? (
						<Image
							src={currentImagePath}
							alt="Imagen del trabajo"
							quality={100}
							fill
							sizes="600x800"
							className="object-fill rounded-box"
						/>
					) : null}
				</div>
				<form method="dialog" className="modal-action mt-1">
					<button className="btn btn-block btn-error rounded-box">
						Cerrar
					</button>
				</form>
			</div>

			<form method="dialog" className="modal-backdrop">
				<button>Cerrar</button>
			</form>
		</dialog>
	);
}

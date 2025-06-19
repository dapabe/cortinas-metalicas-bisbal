"use client";
import Image from "next/image";
import { workImagePaths } from "#/constants/workImagePaths";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function ImageModalPreview() {
	const router = useRouter();
	const pathname = usePathname();
	const sp = useSearchParams();

	const currentImageId = sp.get("preview");
	const [imagePath, setImagePath] = useState(null);

	useEffect(() => {
		const int = parseInt(currentImageId);
		if (isNaN(int)) return;
		if (!workImagePaths.has(int)) return;

		setImagePath(workImagePaths.get(int));

		return () => setImagePath(null);
	}, [sp]);

	const closePreview = () => {
		router.replace(pathname, { scroll: false });
	};

	return (
		<dialog className="modal p-2" open={!!imagePath}>
			<div className="modal-box flex flex-col w-full max-w-3xl max-h-screen h-full p-2">
				<div className="relative flex-1">
					{imagePath ? (
						<Image
							src={imagePath}
							alt="Imagen del trabajo"
							quality={100}
							fill
							sizes="600x800"
							className="object-fill rounded-box"
						/>
					) : null}
				</div>
				<div className="modal-action mt-1">
					<button
						onClick={closePreview}
						className="btn btn-block btn-error rounded-box"
					>
						Cerrar
					</button>
				</div>
			</div>

			<div method="dialog" className="modal-backdrop">
				<button onClick={closePreview}>Cerrar</button>
			</div>
		</dialog>
	);
}

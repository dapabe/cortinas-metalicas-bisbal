"use client";
import { useImagePreview } from "#/hooks/useImagePreview";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { workImagePaths } from "#/constants/workImagePaths";

export function ImageCarousel() {
	const { currentImagePath, closePreview, setCurrentImagePath } =
		useImagePreview();

	return (
		<dialog
			className="modal p-0"
			open={!!currentImagePath}
			onClose={closePreview}
		>
			<div className="modal-box flex flex-col w-full max-w-3xl max-h-screen h-full">
				<form method="dialog" className="ml-auto mb-2">
					<button className="btn btn-circle btn-ghost">
						<XMarkIcon className="size-24" />
					</button>
				</form>
				<div className="p-2 relative grow">
					{currentImagePath && (
						<Image
							src={currentImagePath}
							alt="Imagen del trabajo"
							quality={100}
							fill
							sizes="600x800"
							className="object-fill rounded-md"
						/>
					)}
				</div>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button>Cerrar</button>
				{/* <nav className="carousel rounded-box bg-base-100 p-2 space-x-2">
					{workImagePaths.map((path, index) => (
						<button
							key={index}
							className="carousel-item size-32 relative btn"
							onClick={() => setCurrentImagePath(path)}
						>
							<Image
								src={path}
								alt={`Thumbnail ${index + 1}`}
								// width={100}
								// height={100}
								fill
								className="object-cover rounded-md"
							/>
						</button>
					))}
				</nav> */}
			</form>
		</dialog>
	);
}

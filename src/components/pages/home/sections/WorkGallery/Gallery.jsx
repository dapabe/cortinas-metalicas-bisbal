"use client";
import "react-photo-view/dist/react-photo-view.css";
import { WorkImagePaths } from "#/constants/WorkImagePaths.data";
import { MagnifyingGlassPlusIcon } from "@heroicons/react/24/outline";
import Masonry from "react-masonry-css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Image from "next/image";
import { useState } from "react";
import { twJoin } from "tailwind-merge";

export function Gallery() {
	const [isOpen, toggleOpen] = useState(false);

	return (
		<div
			className={twJoin(
				"-ml-2 max-w-4xl relative",
				!isOpen && "max-h-[80vh] overflow-y-hidden"
			)}
		>
			<PhotoProvider>
				<Masonry
					breakpointCols={{ 320: 1, 640: 2, 1024: 3, default: 4 }}
					className="flex flex-1"
					columnClassName="pl-2 bg-clip-padding *:mb-4 flex flex-col w-max"
				>
					{[...WorkImagePaths.entries()].map((img) => (
						<PhotoView
							key={img[0]}
							width={img[1].sizes[0]}
							height={img[1].sizes[1]}
							src={img[1].src}
						>
							<div className="relative bg-base-300 shadow-lg p-1.5 rounded-box lg:max-w-48">
								<Image
									src={img[1].src}
									loading="lazy"
									alt="Mini vista previa de cortina metalica ya instalada"
									width={img[1].sizes[0]}
									height={img[1].sizes[1]}
									className="rounded-box object-cover"
								/>
								{/* Para escritorio */}
								<div className="hidden md:flex absolute inset-0 group hover:bg-black/50 transition-colors rounded-box items-center justify-center cursor-pointer">
									<MagnifyingGlassPlusIcon className="opacity-0 group-hover:opacity-100 size-24 text-base-100" />
								</div>
								{/* Para celulares */}
								<div className="md:hidden absolute bottom-0 right-0 bg-base-100 p-2 rounded-tl-md rounded-br-md opacity-30">
									<MagnifyingGlassPlusIcon className="size-12 text-base-content" />
								</div>
							</div>
						</PhotoView>
					))}
				</Masonry>
			</PhotoProvider>
			{isOpen ? null : (
				<button
					className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-base-100 to-transparent flex items-end justify-center cursor-pointer"
					onClick={() => toggleOpen(true)}
				>
					<span className="btn btn-lg btn-neutral m-auto rounded-full">
						Mostrar Toda la Galería
					</span>
				</button>
			)}
		</div>
	);
}

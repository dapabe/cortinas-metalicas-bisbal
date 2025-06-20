"use client";
import { workImagePaths } from "#/constants/workImagePaths";
import Masonry from "react-masonry-css";
import {
	UsersIcon,
	WrenchScrewdriverIcon,
	ExclamationTriangleIcon,
	Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { SectionTitle } from "../SectionTitle";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { MagnifyingGlassPlusIcon } from "@heroicons/react/24/solid";

export function WorkGallerySection() {
	return (
		<section id="trabajos" className="container mx-auto p-4 space-y-4 relative">
			<SectionTitle>
				<span className="underline decoration-primary">Trabajos</span>{" "}
				Realizados
			</SectionTitle>
			<div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-around gap-4">
				<div className="lg:sticky lg:top-1/3">
					<div className="card lg:card-lg card-dash bg-base-100 w-96 shadow-sm">
						<div className="card-body">
							<h3 className="card-title underline decoration-primary">
								Garantizamos
							</h3>
							<ul className="*:flex *:items-center *:gap-x-2 lg:space-y-2">
								<li>
									<UsersIcon className="size-6 text-primary" />
									<span>Responsabilidad, puntualidad y buen servicio</span>
								</li>
								<li>
									<Cog6ToothIcon className="size-6 text-primary" />
									<span>Reparaciones, reformas y motorizaciones</span>
								</li>
								<li>
									<WrenchScrewdriverIcon className="size-6 text-primary" />
									<span>Trabajos de mantenimiento</span>
								</li>
								<li>
									<ExclamationTriangleIcon className="size-6 text-primary" />
									<span>
										Urgencias las <b className="text-primary">24 horas</b>
									</span>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<PhotoProvider>
					<Masonry
						breakpointCols={{ 320: 1, 640: 2, 1024: 3, default: 4 }}
						className="-ml-2 max-w-4xl flex flex-1"
						columnClassName="pl-2 bg-clip-padding *:mb-4 flex flex-col w-max"
					>
						{[...workImagePaths.entries()].map((img) => (
							<PhotoView
								key={img[0]}
								width={img[1].sizes[0]}
								height={img[1].sizes[1]}
								src={img[1].src}
							>
								<div className="relative bg-base-300 shadow-lg p-1.5 rounded-box lg:max-w-48">
									<img
										src={img[1].src}
										loading="lazy"
										alt="Mini vista previa"
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
			</div>
		</section>
	);
}

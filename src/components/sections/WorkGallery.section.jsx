"use client";
// import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
// import { WorkImagePreview } from "./WorkImagePreview";
import { workImagePaths } from "#/constants/workImagePaths";
// import { Gallery } from "next-gallery";
import Masonry from "react-masonry-css";
import { WorkImagePreview } from "../WorkImagePreview";
import {
	UsersIcon,
	WrenchScrewdriverIcon,
	ExclamationTriangleIcon,
	Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { SectionTitle } from "../SectionTitle";

export function WorkGallerySection() {
	return (
		<section id="trabajos" className="flex flex-col p-4 gap-4">
			<SectionTitle>Trabajos Realizados</SectionTitle>
			<div className="card card-dash bg-base-200 w-96">
				<div className="card-body">
					<h3 className="card-title underline decoration-primary">
						Garantizamos
					</h3>
					<ul className="*:flex *:items-center *:gap-x-2">
						<li>
							<UsersIcon className="size-6 text-primary" />
							<span>Responsabilidad, puntualidad y buen servicio</span>
						</li>
						<li>
							<WrenchScrewdriverIcon className="size-6 text-primary" />
							<span>Reparaciones, reformas y motorizaciones</span>
						</li>
						<li>
							<Cog6ToothIcon className="size-6 text-primary" />
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

			{/* <div className="overflow-x-scroll w-full">
				<div className="carousel carousel-end rounded-box">
					{workImagePaths.map((path) => (
						<div key={path} className="carousel-item">
							<WorkImagePreview path={path} />
						</div>
					))}
				</div>
			</div> */}
			<Masonry
				breakpointCols={{ 360: 1, 768: 2, 1024: 4 }}
				className="-ml-2 max-h-80 h-80 overflow-scroll w-auto flex"
				columnClassName="pl-2 bg-clip-padding *:mb-4"
			>
				{[...workImagePaths.entries()].map((img) => (
					<WorkImagePreview key={img[0]} id={img[0]} imagePath={img[1]} />
				))}
			</Masonry>
		</section>
	);
}

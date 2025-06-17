"use client";
// import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
// import { WorkImagePreview } from "./WorkImagePreview";
import { workImagePaths } from "#/constants/workImagePaths";
// import { Gallery } from "next-gallery";
import Masonry from "react-masonry-css";
import { WorkImagePreview } from "./WorkImagePreview";

export function WorkGallery() {
	return (
		<div
			id="trabajos"
			className="flex flex-col items-center justify-items-center p-8 gap-4"
		>
			<div className="text-center text-lg font-semibold">
				Trabajos realizados
			</div>
			<div className="card card-dash bg-base-200 w-96">
				<div className="card-body">
					<h3 className="card-title">Garantizamos</h3>
					<p>Responsabilidad, puntualidad y buen servicio.</p>
					<p>Reparaciones, reformas, motorizaciones.</p>
					<p>Trabajos de mantenimiento.</p>
					<p>Urgencias las 24 horas</p>
				</div>
			</div>

			<div className="block md:hidden overflow-x-scroll w-full">
				<div className="carousel carousel-end rounded-box">
					{workImagePaths.map((path) => (
						<div className="carousel-item">
							<WorkImagePreview path={path} />
						</div>
					))}
				</div>
			</div>
			<Masonry
				breakpointCols={{ default: 4, 1024: 3, 768: 2, 360: 1 }}
				className="hidden md:flex w-full max-w-sm -ml-8"
				columnClassName="pl-8 mb-8 bg-clip-padding"
			>
				{workImagePaths.map((path) => (
					<WorkImagePreview path={path} />
				))}
			</Masonry>

			{/* <ResponsiveMasonry
				className="w-full"
				columnsCountBreakPoints={{ 360: 1, 460: 2, 768: 3, 1024: 4 }}
				gutterBreakpoints={{ 360: "12px", 768: "16px", 1024: "24px" }}
			>
				<Masonry>
					{workImagePaths.map((path) => (
						<WorkImagePreview path={path} />
					))}
				</Masonry>
			</ResponsiveMasonry> */}
		</div>
	);
}

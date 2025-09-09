import {
	UsersIcon,
	WrenchScrewdriverIcon,
	ExclamationTriangleIcon,
	Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { SectionTitle } from "../../../../SectionTitle";
import { AnchorSectionNames } from "#/constants/AnchorSectionNames";
import { Gallery } from "./Gallery";

export function WorkGallerySection() {
	return (
		<section
			id={AnchorSectionNames.JobPreview}
			className="container mx-auto p-4 space-y-4 relative"
		>
			<SectionTitle anchorSectionName={AnchorSectionNames.JobPreview}>
				<span className="underline decoration-primary">Trabajos</span>{" "}
				Realizados
			</SectionTitle>
			<div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-around gap-4">
				<div className="lg:sticky lg:top-1/3">
					<div className="card lg:card-lg card-dash bg-base-100 w-96 shadow-sm">
						<div className="card-body">
							<h3 className="card-title underline decoration-primary text-xl">
								Garantizamos
							</h3>
							<ul className="*:flex *:items-center *:gap-x-2 lg:space-y-2 text-lg">
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
										Urgencias las{" "}
										<b className="text-primary-content bg-primary px-1 transition-transform skew-x-12">
											24 horas
										</b>
									</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<Gallery />
			</div>
		</section>
	);
}

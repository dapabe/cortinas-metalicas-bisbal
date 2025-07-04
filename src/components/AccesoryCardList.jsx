import { AccesoriesData } from "#const/accesoriesData";
import Image from "next/image";

export function AccesoryCardList() {
	return (
		<ul
			className="carousel yes-scrollbar p-8 w-full gap-2 px-12"
			aria-label="Galeria de accesorios de Cortinas Metálicas a la venta"
		>
			{[...AccesoriesData.entries()].map(
				(/** @type {[string, IAccesoryMetadata]} */ [filePath, metadata]) => {
					return (
						<li
							key={filePath}
							className="carousel-item rounded-box max-w-64 lg:w-96"
						>
							<figure className="card shadow-md size-full">
								<div className="card-body items-center">
									<h3 className="text-center font-semibold">{metadata.name}</h3>
									<div className="relative w-full aspect-[4/3] overflow-hidden rounded-box">
										<Image
											src={`/accesory/${filePath}`}
											alt={metadata.name}
											className="object-cover"
											fill
											sizes="(max-width: 768px) 100vw, 50vw"
										/>
									</div>

									<figcaption className="label bg-base-200 p-2 mt-2 rounded-box text-wrap w-full">
										{metadata.description}
									</figcaption>
								</div>
							</figure>
						</li>
					);
				}
			)}
		</ul>
	);
}

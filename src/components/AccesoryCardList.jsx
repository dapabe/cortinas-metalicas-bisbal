import { accesoriesData } from "#/constants/accesoriesData";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export function AccesoryCardList() {
	return (
		<ol
			className="carousel w-xs bg-base-300"
			aria-label="Galeria de accesorios de Cortinas Metálicas a la venta"
		>
			{[...accesoriesData.entries()].map(
				(
					/** @type {[string, IAccesoryMetadata]} */ [filePath, metadata],
					index
				) => {
					const prevFile =
						[...accesoriesData.keys()][index - 1] ??
						[...accesoriesData.keys()].slice(-1)[0];
					const nextFile =
						[...accesoriesData.keys()][index + 1] ??
						[...accesoriesData.keys()][0];

					return (
						<li
							id={`accesory:${filePath}`}
							data-current={filePath ? true : undefined}
							className="carousel-item relative w-full"
							key={filePath}
							tabIndex={0}
						>
							<figure className="flex flex-col relative">
								<h3 className="text-center font-bold">{metadata.name}</h3>
								<Image
									src={`/accesory/${filePath}`}
									alt={metadata.name}
									className="bg-base-300 object-cover"
									width={metadata.sizes[0]}
									height={metadata.sizes[1]}
									loading="lazy"
								/>
								{metadata.description && (
									<figcaption>{metadata.description}</figcaption>
								)}
								<nav className="absolute inset-x-0.5 inset-y-1/2 -translate-y-1/2 flex justify-between opacity-0 group-[current]:opacity-100">
									<Link
										href={`#accesory:${prevFile}`}
										scroll={false}
										className="btn btn-circle btn-xl sm:btn-md"
									>
										<ArrowLeftIcon className="" />
									</Link>
									<Link
										href={`#accesory:${nextFile}`}
										scroll={false}
										className="btn btn-circle btn-xl sm:btn-md"
									>
										<ArrowRightIcon className="" />
									</Link>
								</nav>
							</figure>
						</li>
					);
				}
			)}
		</ol>
		// 	</div>
		// </div>
	);
}

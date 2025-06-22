import { accesoriesData } from "#/constants/accesoriesData";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export function AccesoryCardList() {
	return (
		<ul className="carousel max-w-64 overflow-y-scroll">
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
							className="carousel-item relative size-64"
							key={filePath}
						>
							{/* <Image
								src={`/accesory/${filePath}`}
								alt={`${metadata.name} - ${metadata.description}`}
								className="bg-base-300 object-cover"
								width={metadata.sizes[0]}
								height={metadata.sizes[1]}
								loading="lazy"
							/> */}
							<div className="absolute left-5 right-5 top-1/2 -translate-1/2 transform flex justify-between">
								<Link
									href={`#accesory:${prevFile}`}
									scroll={false}
									className="btn btn-circle"
								>
									<ChevronLeftIcon className="size-8 text-neutral" />
								</Link>
								<Link
									href={`#accesory:${nextFile}`}
									scroll={false}
									className="btn btn-circle"
								>
									<ChevronRightIcon className="size-8 text-neutral" />
								</Link>
							</div>
						</li>
					);
				}
			)}
		</ul>
		// 	</div>
		// </div>
	);
}

import Image from "next/image";
import {
	AcademicCapIcon,
	ArrowRightIcon,
	CheckIcon,
	MegaphoneIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { WorkImagePaths } from "../../constants/WorkImagePaths";
import { AnchorSectionNames } from "../../constants/AnchorSectionNames";

export function HeroSection() {
	const AuxXLImage = WorkImagePaths.get(6);
	return (
		<section className="w-full relative flex flex-col items-start">
			{/* Badge */}
			<div className="my-3 ml-6 badge badge-lg md:badge-xl badge-primary text-wrap text-left">
				Diseño Industrial · Calidad de Primera
			</div>
			{/* Titulo */}
			<div className="mb-12 rounded-md rounded-br-full p-4 shadow-xl max-w-sm md:max-w-lg relative text-left">
				<h1 className="text-5xl text-left font-bold flex flex-wrap gap-x-2">
					<span className="indent-2">Cortinas</span>{" "}
					<span className="indent-2">Metálicas</span>{" "}
					<span className="opacity-0 text-xl">Bisbal</span>
				</h1>

				<div className="absolute -bottom-10 md:-bottom-8 left-2 py-2 px-4 rounded-b-xl bg-base-100 shadow-xl">
					<span className="text-5xl font-bold leading-1">Bisbal</span>
				</div>
			</div>
			{/* <div className="my-8 md:hidden"></div> */}
			<div className="container px-4 mx-auto grid grid-cols-5 grid-rows-5 md:grid-cols-8 sm:grid-rows-4 lg:grid-rows-3">
				{/* Main Image*/}
				<div className="relative col-start-1 col-span-full row-start-1 row-span-3 md:col-start-2 lg:col-start-3 lg:z-20 xl:col-start-5 xl:ml-auto">
					<Image
						src={"/work/cortina1.webp"}
						className="mask mask-squircle object-cover bg-base-300 md:max-w-2xl lg:max-w-3xl"
						alt="Cortina metálica siendo instalada en un ambiente calido con vista al exterior"
						quality={100}
						width={1280}
						height={960}
						priority
					/>

					<InfoFloaters />
				</div>

				{/* Persona1 */}
				<div className="col-start-1 col-span-2 row-start-3 row-span-2 grid-rows-subgrid grid-cols-subgrid grid sm:col-start-4 md:col-start-7 lg:row-start-1 lg:col-start-1 lg:col-span-3 lg:z-10 xl:col-start-4 xl:row-start-2 xl:row-span-2 xl:col-span-2">
					<Image
						src={"/work/people1.webp"}
						className="mask mask-squircle object-cover bg-base-300 shadow-md col-span-full row-span-full"
						alt="Persona trabajando en la instalación de una cortina metálica"
						quality={100}
						width={1200}
						height={1600}
						priority
					/>
				</div>

				{/* Aux XL Resolution image */}
				<div className="hidden xl:block col-start-3 col-span-2 row-start-1 row-span-2">
					<Image
						src={AuxXLImage.src}
						className="mask mask-hexagon object-cover bg-base-300 shadow-md"
						alt="Cortina metálica ya instalada, estilo moderno"
						quality={100}
						width={AuxXLImage.sizes[0]}
						height={AuxXLImage.sizes[1]}
						priority
					/>
				</div>

				{/* CTA */}
				<div className="z-20 my-auto col-start-1 col-span-5 row-start-5 sm:row-start-4 lg:row-start-3 lg:mt-0 lg:mb-auto xl:col-span-2">
					<nav
						aria-label="Links a secciones importantes del sitio web"
						className="flex flex-col gap-2 max-w-fit"
					>
						<Link
							href={`#${AnchorSectionNames.JobPreview}`}
							className="btn btn-primary font-bold rounded-box"
						>
							Ver Trabajos Realizados
							<ArrowRightIcon className="size-6" />
						</Link>

						<Link
							href={`#${AnchorSectionNames.Promotion}`}
							className="btn btn-secondary btn-outline font-bond rounded-box"
						>
							Ver Promociones
							<MegaphoneIcon className="size-6" />
						</Link>
					</nav>
				</div>
			</div>

			{/* <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
				<ChevronDoubleDownIcon className="size-4 animate-bounce text-secondary duration-100" />
			</div> */}
		</section>
	);
}

function InfoFloaters() {
	return (
		<div className="absolute right-0 bottom-0 sm:bottom-full overflow-visible">
			<div className="stats shadow-lg bg-base-100 absolute right-4 -bottom-12 overflow-visible">
				<div className="stat p-2">
					<AcademicCapIcon className="size-12 text-primary absolute -top-6 right-0" />
					<span className="stat-value text-center">+15 años</span>
					<p className="stat-desc text-center">en el rubro y contando</p>
				</div>
			</div>

			<div className="stats shadow-2xl bg-base-100 absolute -bottom-28 right-4">
				<div className="stat p-2 *:inline-flex *:justify-between *:gap-x-2">
					<p className="stat-desc">
						Instalaciones
						<CheckIcon className="size-4 inline-block text-secondary" />
					</p>
					<p className="stat-desc">
						Reparaciones
						<CheckIcon className="size-4 inline-block text-secondary" />
					</p>
					<p className="stat-desc">
						Accesorios
						<CheckIcon className="size-4 inline-block text-secondary" />
					</p>
				</div>
			</div>
		</div>
	);
}

import Image from "next/image";
import {
	AcademicCapIcon,
	ArrowRightIcon,
	CheckIcon,
	MegaphoneIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { WorkImagePaths } from "#/constants/WorkImagePaths.data";
import { AnchorSectionNames } from "#/constants/AnchorSectionNames";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { SocialLinks } from "#/constants/SocialLinks";

export function HeroSection() {
	const People1 = WorkImagePaths.get(16);
	const People2 = WorkImagePaths.get(3);
	return (
		<section className="w-full relative flex flex-col items-start">
			{/* Badge */}
			<div className="my-2 ml-2 badge badge-lg md:badge-xl badge-primary text-wrap text-left">
				Diseño Industrial · Calidad de Primera
			</div>

			{/* Titulo */}
			<div className="mb-2 rounded-md rounded-br-full p-4 pr-8 shadow-xl max-w-sm md:max-w-lg relative text-left">
				<h1 className="text-5xl text-left font-bold flex flex-wrap gap-x-2">
					<span className="indent-2">Cortinas</span>{" "}
					<span className="indent-2">Metalicas</span>{" "}
				</h1>

				<div className="absolute -bottom-10 md:-bottom-8 left-0 py-2 px-4 rounded-b-xl bg-base-100 shadow-xl z-30">
					<span className="text-5xl font-bold leading-1">Bisbal</span>
				</div>
			</div>

			<div className="container mx-auto grid grid-cols-6 grid-rows-3 md:grid-cols-8 lg:grid-rows-2 xl:grid-rows-1">
				{/* Main Image*/}
				<div className="relative col-span-full row-start-1 row-span-2 md:col-start-2 lg:col-start-3  xl:col-start-5 xl:ml-auto z-20">
					<Image
						src={"/work/cortina1.webp"}
						className="mask mask-squircle bg-base-300 md:max-w-2xl lg:max-w-3xl"
						alt="Cortina metálica siendo instalada en un ambiente calido con vista al exterior"
						quality={100}
						width={1280}
						height={960}
						priority
					/>
					<InfoFloaters />
				</div>

				<div className="z-20 col-start-1 col-span-2 row-start-2 row-span-2 lg:col-start-7 xl:col-start-3 xl:row-start-1 xl:row-span-1 xl:my-auto xl:ml-4">
					<Image
						src={People1.src}
						className="mask mask-squircle object-cover bg-base-300 shadow-xl sm:size-44 lg:size-60 xl:size-80"
						alt="Cortina metálica ya instalada, estilo moderno"
						quality={75}
						width={People1.sizes[0]}
						height={People1.sizes[1]}
					/>
				</div>

				{/* Persona2 */}
				<div className="z-20 col-start-5 sm:col-start-5 col-span-2 row-start-1 row-span-1 sm:row-start-2  md:col-start-1 md:row-start-1 md:mt-auto md:mb-2 lg:m-0">
					<Image
						src={People2.src}
						className="mask mask-squircle bg-base-300 shadow-xl md:size-44 lg:size-fit"
						alt="Persona trabajando en la instalación de una cortina metálica"
						quality={75}
						width={People2.sizes[0]}
						height={People2.sizes[1]}
					/>
				</div>

				<CallToAction />
			</div>
		</section>
	);
}

function InfoFloaters() {
	return (
		<div className="absolute right-0 bottom-12 sm:bottom-full overflow-visible text-md md:text-xl lg:right-24 z-40">
			<div className="stats shadow-lg bg-base-100 absolute right-4 -bottom-12 overflow-visible z-10">
				<div className="stat p-2">
					<AcademicCapIcon className="size-12 text-primary absolute -top-6 right-0" />
					<span className="stat-value text-center">+15 años</span>
					<p className="stat-desc text-center">en el rubro y contando</p>
				</div>
			</div>

			<div className="stats shadow-2xl bg-base-100 absolute -bottom-32 right-4 rounded-t-none">
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
						Motorizaciones
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

function CallToAction() {
	return (
		<div className="z-20 col-start-1 col-span-4 row-start-3  lg:mb-auto lg:row-start-2 xl:col-span-2 px-2 mt-auto sm:mt-0 lg:my-auto xl:mt-0">
			<nav
				aria-label="Links a secciones importantes del sitio web"
				className="flex flex-col gap-3 max-w-fit"
			>
				<Link
					aria-label="Link para charlar por WhatsApp"
					href={SocialLinks.WhatsApp}
					target="_blank"
					rel="noopener noreferrer"
					className="btn btn-success font-bold rounded-box"
				>
					Ponerse en contacto
					<ChatBubbleLeftEllipsisIcon className="size-6" />
				</Link>
				<Link
					href={`#${AnchorSectionNames.JobPreview}`}
					className="btn btn-primary font-bold rounded-box"
				>
					Ver Trabajos Realizados
					<ArrowRightIcon className="size-6" />
				</Link>
				<Link
					href={`#${AnchorSectionNames.Promotion}`}
					className="btn btn-secondary btn-outline font-bold w-max rounded-box"
				>
					Ver Promociones y Envios
					<MegaphoneIcon className="size-6" />
				</Link>
			</nav>
		</div>
	);
}

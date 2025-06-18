"use client";
import Image from "next/image";
import {
	AcademicCapIcon,
	ArrowRightIcon,
	CheckIcon,
	MegaphoneIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

export function HeroSection() {
	const contactWSP = () => {
		document.getElementById("wsp").click();
	};

	return (
		<section className="h-[calc(100vh-16rem)] w-full relative">
			<div className="text-left max-w-screen flex flex-col items-start h-full">
				{/* Badge */}
				<div className="my-3 ml-6 badge badge-lg md:badge-xl badge-primary text-wrap">
					Diseño Industrial · Calidad de Primera
				</div>
				{/* Titulo */}
				<div className="rounded-md rounded-br-full p-4 pt-0 shadow-xl max-w-sm md:max-w-lg relative">
					<h1 className="text-5xl text-left font-bold flex flex-wrap gap-x-2">
						<span className="indent-2">Cortinas</span>{" "}
						<span className="indent-2">Metálicas</span>{" "}
						<span className="opacity-0 text-xl">Bisbal</span>
					</h1>

					<div className="absolute -bottom-10 md:-bottom-8 left-2 py-2 px-4 rounded-b-xl bg-base-100 shadow-xl">
						<span className="text-5xl font-bold leading-1">Bisbal</span>
					</div>
				</div>
				<div className="mt-16"></div>
				{/* Main Image - SM Breakpoint */}
				<div className="sm:hidden relative w-full">
					<Image
						src={"/work/cortina1.jpeg"}
						className="mask mask-squircle object-cover"
						alt="Cortina metálica siendo instalada en un ambiente calido con vista al exterior"
						quality={100}
						width={1280}
						height={960}
						priority
					/>

					{/* Info flotadores */}
					<div className="absolute right-0 bottom-0 overflow-visible">
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
				</div>

				{/* CTA */}
				<div className="pl-6 flex-1">
					<nav className="flex flex-col gap-2 max-w-fit">
						<Link
							href={"#trabajos"}
							className="btn btn-primary font-bold rounded-box"
						>
							Ver Trabajos Realizados
							<ArrowRightIcon className="size-6" />
						</Link>

						<Link
							href={"#promo"}
							className="btn btn-secondary btn-outline font-bond rounded-box"
						>
							Ver Promociones
							<MegaphoneIcon className="size-6" />
						</Link>
					</nav>
				</div>
			</div>
		</section>
	);
}

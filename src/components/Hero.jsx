"use client";
import Image from "next/image";
import { ArrowRightIcon, CheckIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export function Hero() {
	const contactWSP = () => {
		document.getElementById("wsp").click();
	};

	return (
		<section className="h-[calc(100vh-16rem)] w-full bg-base-200 relative">
			<div className="text-left max-w-screen flex-col pl-0 items-start">
				<div className="mb-3 mt-3 ml-6 badge badge-md md:badge-xl badge-primary badge-outline text-wrap">
					Diseño Industrial · Calidad de Primera
				</div>
				{/* Titulo */}
				<section className="mb-16 rounded-md rounded-br-full p-4 pt-0 shadow-xl max-w-sm md:max-w-lg relative">
					<h1 className="text-5xl text-left font-bold flex flex-wrap gap-x-2">
						<span className="indent-2">Cortinas</span>{" "}
						<span className="indent-2">Metálicas</span>{" "}
						<span className="opacity-0 text-xl">Bisbal</span>
					</h1>

					<div className="absolute -bottom-10 md:-bottom-8 left-2 py-2 px-4 rounded-b-xl bg-base-200 shadow-xl">
						<span className="text-5xl font-bold leading-1">Bisbal</span>
					</div>
				</section>

				<div className="md:hidden relative">
					<Image
						src={"/work/cortina1.jpeg"}
						className="mask mask-squircle w-full"
						alt="Cortina metálica siendo instalada en un ambiente calido con vista al exterior"
						quality={100}
						width={360}
						height={360}
						priority
					/>
					<div className="stats shadow-2xl bg-base-200 absolute left-4 -bottom-12">
						<div className="stat">
							<div className="stat-title text-center">Más de</div>
							<div className="stat-value text-center">15 🎉</div>
							<div className="stat-desc">años en el rubro y contando</div>
						</div>
					</div>
				</div>

				<p className="text-lg p-4">
					Y venta de accesorios al mejor precio. <br />
					Transforma tu negocio y hogar en lugares seguros.
				</p>

				{/* Garantias */}
				<section className="mb-10 ml-6 card shadow-sm max-w-lg bg-base-100 pb-4 px-4">
					<div>
						<div className="card-body">
							<h2 className="text-3xl font-bold">Garantizamos</h2>
						</div>
						<ul className="*:flex *:items-center text-lg">
							<li>
								<CheckIcon className="size-4 mr-2 text-success" />
								<span>Responsabilidad, puntualidad y buen servicio.</span>
							</li>
							<li>
								<CheckIcon className="size-4 mr-2 text-success" />
								<span>Reparaciones, reformas y motorizaciones.</span>
							</li>
							<li>
								<CheckIcon className="size-4 mr-2 text-success" />
								<span>Trabajos de mantenimiento.</span>
							</li>
							<li>
								<CheckIcon className="size-4 mr-2 text-success" />
								<span>Urgencias las 24 horas</span>
							</li>
						</ul>
					</div>
				</section>

				{/* CTA */}
				<div className="ml-6 flex flex-col gap-2 max-w-fit">
					<a
						href={"#trabajos"}
						className="btn btn-primary font-bold rounded-box"
					>
						Ver Trabajos Realizados
						<ArrowRightIcon className="size-6" />
					</a>

					<button
						type="button"
						onClick={contactWSP}
						className="btn btn-success btn-outline font-bond rounded-box"
					>
						Contactarse
						<ArrowRightIcon className="size-6" />
					</button>
				</div>
			</div>
		</section>
	);
}

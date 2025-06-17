import Image from "next/image";
import { ArrowRightIcon, CheckIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export function Hero() {
	return (
		<div className="hero h-[calc(100vh-16rem)] w-full bg-base-200 relative justify-items-start items-start">
			<div className="hero-content text-left max-w-screen flex-col pl-0 items-start">
				<div className="mb-8 ml-6 badge badge-md md:badge-xl badge-primary badge-outline text-wrap">
					Diseño Industrial · Calidad de Primera
				</div>

				{/* Titulo */}
				<div className="mb-5 rounded-md rounded-br-full p-4 shadow-lg max-w-lg relative">
					<h1 className="text-5xl text-left font-bold flex flex-wrap gap-4">
						<span>Cortinas</span> <span>Metálicas</span>{" "}
						<span className="opacity-0 text-xl">Bisbal</span>
					</h1>
					<span className="absolute text-5xl font-bold bottom-0">Bisbal</span>
				</div>

				{/* Garantias */}
				<div className="mb-10 ml-6 card shadow-sm w-96 bg-base-100">
					<div className="card-body">
						<div>
							<h2 className="text-3xl font-bold">Garantizamos</h2>
						</div>
						<ul className="*:flex *:items-center">
							<li>
								<CheckIcon className="size-4 mr-2" />
								<span>Responsabilidad, puntualidad y buen servicio.</span>
							</li>
							<li>
								<CheckIcon className="size-4 mr-2" />
								<span>Reparaciones, reformas, motorizaciones.</span>
							</li>
							<li>
								<CheckIcon className="size-4 mr-2" />
								<span>Trabajos de mantenimiento.</span>
							</li>
							<li>
								<CheckIcon className="size-4 mr-2" />
								<span>Urgencias las 24 horas</span>
							</li>
						</ul>
					</div>
				</div>

				{/* CTA */}
				<div className="ml-6 flex">
					<a
						href={"#trabajos"}
						className="btn btn-primary btn-outline font-bold"
					>
						Ver Trabajos Realizados
						<ArrowRightIcon className="size-6" />
					</a>
				</div>
			</div>
			{/* <Image
				src={"/work/cortina1.jpeg"}
				className="object-cover h-[calc(100vh-16rem)] w-full"
				// placeholder="blur"
				alt="Cortina metálica siendo instalada en un ambiente calido con vista al exterior"
				quality={100}
				priority
				fill
			/> */}
			{/* <div className="absolute inset-0 bg-gradient-to-r from-base-100 via-base-100/90 to-base-100/0"></div> */}
			{/* <div className="hero-overlay"></div> */}
		</div>
	);
}

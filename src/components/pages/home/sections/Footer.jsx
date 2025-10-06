import Link from "next/link";
import { OpenMail } from "../../../OpenMail";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { SocialLinks } from "#/constants/SocialLinks";

export function Footer() {
	return (
		<footer className="footer md:footer-horizontal bg-neutral text-neutral-content p-10">
			<aside className="max-w-xs md:mx-auto">
				<h2 className="text-5xl font-bold">Cortinas Metalicas Bisbal</h2>
				<p>
					Copyright <span>©</span> 2025
				</p>
			</aside>

			<nav aria-label="Enlaces sociales">
				<h3 className="footer-title">Redes Sociales</h3>
				<Link
					aria-label="Link a la página oficial de Facebook"
					href={SocialLinks.Facebook}
					target="_blank"
					rel="noopener noreferrer"
					className="link link-hover inline-flex items-center gap-x-1"
				>
					Facebook
					<ArrowTopRightOnSquareIcon className="size-3 inline-block" />
				</Link>
				<Link
					aria-label="Link a la página oficial de Facebook"
					href={SocialLinks.Instagram}
					target="_blank"
					rel="noopener noreferrer"
					className="link link-hover inline-flex items-center gap-x-1"
				>
					Instagram
					<ArrowTopRightOnSquareIcon className="size-3 inline-block" />
				</Link>
			</nav>

			<nav aria-label="Enlaces de contacto directo">
				<h3 className="footer-title">Contacto</h3>
				<Link
					aria-label="Link para charlar por WhatsApp"
					href={SocialLinks.WhatsApp}
					target="_blank"
					rel="noopener noreferrer"
					className="link link-hover inline-flex items-center gap-x-1"
				>
					WhatsApp
					<ArrowTopRightOnSquareIcon className="size-3 inline-block" />
				</Link>
				{/* <Link
					aria-label="Link hacia el post del servicio en Mercado Libre"
					href="https://servicio.mercadolibre.com.ar/MLA-1506820187-cortinas-metalicas-bisbal-_JM"
					target="_blank"
					rel="noopener noreferrer"
					className="link link-hover inline-flex items-center gap-x-1"
				>
					Mercado Libre
					<ArrowTopRightOnSquareIcon className="size-3 inline-block" />
				</Link> */}
			</nav>

			<nav aria-label="Enlaces de correo electrónico">
				<h3 className="footer-title">Correo</h3>
				<div className="inline-flex items-center gap-x-1">
					<OpenMail email="bisbalcristian70@gmail.com" />
					<ArrowTopRightOnSquareIcon className="size-3 inline-block" />
				</div>
			</nav>

			<nav aria-label="Creador del sitio web">
				<h3 className="footer-title">Creador del sitio web</h3>
				{/* <div className="inline-flex items-center gap-x-1">
					<OpenMail email="dapadev@hotmail.com" />
					<ArrowTopRightOnSquareIcon className="size-3 inline-block" />
				</div> */}
				<div className="inline-flex items-center gap-x-1">
					<Link
						aria-label="Link hacia otras formas de contacto del creador"
						href="https://linktr.ee/denzere"
						target="_blank"
						rel="noopener noreferrer"
						className="link link-hover inline-flex items-center gap-x-1"
					>
						Formas de contacto
					</Link>
					<ArrowTopRightOnSquareIcon className="size-3 inline-block" />
				</div>
				<div className="inline-flex items-center gap-x-1">
					<Link
						tabIndex={-1}
						href="/backoffice"
						className="link link-hover inline-flex items-center gap-x-1"
					>
						Personal Autorizado
					</Link>
				</div>
			</nav>
		</footer>
	);
}

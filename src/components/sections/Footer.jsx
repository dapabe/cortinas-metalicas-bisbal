"use client";

import Link from "next/link";
import { OpenMail } from "../OpenMail";

export function Footer() {
	return (
		<footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
			<aside className="max-w-xs md:mx-auto">
				<h2 className="text-5xl font-bold">Cortinas Metálicas Bisbal</h2>
				<p>
					Copyright <span>©</span> 2025
				</p>
			</aside>

			<nav aria-label="Enlaces sociales">
				<h3 className="footer-title">Social</h3>
				<Link
					aria-label="Link a la página oficial de Facebook"
					href={"https://www.facebook.com/share/16namTSGSD/"}
					target="_blank"
					rel="noopener noreferrer"
					className="link link-hover"
				>
					Facebook
				</Link>
			</nav>

			<nav aria-label="Enlaces de contacto directo">
				<h3 className="footer-title">Contacto</h3>
				<Link
					aria-label="Link para charlar por WhatsApp"
					href="https://wa.me/5491126942624?text=Hola%20Cortinas%20Metálicas%20Bisbal,%20me%20gustaría%20consultar"
					target="_blank"
					rel="noopener noreferrer"
					className="link link-hover"
				>
					WhatsApp
				</Link>
			</nav>

			<nav aria-label="Enlaces de correo electrónico">
				<h3 className="footer-title">Correo</h3>
				<OpenMail email="bisbalcristian70@gmail.com" />
			</nav>
		</footer>
	);
}

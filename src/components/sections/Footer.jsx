"use client";

import Link from "next/link";
import { useMemo } from "react";

export function Footer() {
	// No email grabbers
	const email = useMemo(
		() =>
			[..."bisbalcristian70@gmail.com"].map((x, i) => <span key={i}>{x}</span>),
		[]
	);

	const openMail = () => {
		const a = document.createElement("a");
		a.href = "mailto:bisbalcristian70@gmail.com";
		a.click();
		a.remove();
	};

	return (
		<footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
			<aside className="max-w-xs">
				<h2 className="text-5xl font-bold">Cortinas Metálicas Bisbal</h2>
				<p>
					Copyright <span>©</span> 2025
				</p>
			</aside>

			<nav>
				<h3 className="footer-title">Redes Sociales</h3>
				<Link
					href={"https://www.facebook.com/share/16namTSGSD/"}
					target="_blank"
					rel="noopener noreferrer"
					className="link link-hover"
				>
					Facebook
				</Link>
			</nav>

			<nav>
				<h3 className="footer-title">Contacto</h3>
				<Link
					href="https://wa.me/5491126942624?text=Hola%20Cortinas%20Metálicas%20Bisbal,%20me%20gustaría%20consultar"
					target="_blank"
					rel="noopener noreferrer"
					className="link link-hover"
				>
					WhatsApp
				</Link>
			</nav>

			<nav>
				<h3 className="footer-title">Correo</h3>
				<button type="button" onClick={openMail} className="link link-hover">
					{email}
				</button>
			</nav>
		</footer>
	);
}

"use client";
import { AnchorSectionNames } from "#/constants/AnchorSectionNames";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { twJoin } from "tailwind-merge";

export function FloatingNavbar() {
	// const ref = useRef(null);
	const [visible, setVisible] = useState(false);
	const sentinelRef = useRef(null);

	useEffect(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				// Si el sentinel NO es visible, el navbar está sticky
				setVisible(!entry.isIntersecting);
			},
			{ rootMargin: "0px", threshold: 0 }
		);
		observer.observe(sentinel);
		return () => observer.disconnect();
	}, []);

	return (
		<>
			<div ref={sentinelRef} style={{ height: 0.1 }} aria-hidden></div>
			<section
				className={twJoin(
					`sticky top-0 z-50 ${
						visible ? "block opacity-100" : "hidden opacity-0"
					}`
				)}
				style={{ paddingTop: "env(safe-area-inset-top)" }}
			>
				<nav className="flex gap-2 font-bold justify-center flex-wrap bg-base-100 p-2 size-full">
					<Link
						href={`#${AnchorSectionNames.ChooseUs}`}
						className="btn btn-neutral rounded-box btn-sm md:btn-md"
					>
						¿Por qué elegirnos?
					</Link>
					<Link
						href={`#${AnchorSectionNames.JobPreview}`}
						className="btn btn-neutral rounded-box btn-sm md:btn-md"
					>
						Trabajos Realizados
					</Link>
					<Link
						href={`#${AnchorSectionNames.Promotion}`}
						className="btn btn-neutral rounded-box btn-sm md:btn-md"
					>
						Promociones
					</Link>
					<Link
						href={`#${AnchorSectionNames.Accesories}`}
						className="btn btn-neutral rounded-box btn-sm md:btn-md"
					>
						Articulos a la venta
					</Link>
					<Link
						href={`#${AnchorSectionNames.Accesories}`}
						className="btn btn-neutral rounded-box btn-sm md:btn-md"
					>
						Dejar Reseña
					</Link>
				</nav>
			</section>
		</>
	);
}

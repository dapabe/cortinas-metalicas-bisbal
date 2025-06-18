"use client";
import { useState } from "react";
import { SectionTitle } from "../SectionTitle";
import Link from "next/link";
import { ArrowRightIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";

export function WorkZoneSection() {
	return (
		<section className="p-4 flex flex-col gap-4">
			<SectionTitle>Preguntas Frecuentes</SectionTitle>
			<div className="join join-vertical max-w-md">
				<Accordion
					title="¿En que lugares solemos trabajar?"
					desc={
						<>
							Por toda la zona de <b>CABA</b>, <b>Matadero</b> y alrededores.
						</>
					}
				/>
				<Accordion
					title="¿Hasta donde hacen envios?"
					desc="Hacemos envios a todo el país."
				/>
			</div>

			<p className="text-center">
				¿Te gustaria ver los accesorios disponibles?
			</p>
			<Link
				href={"#accesorios"}
				className="btn btn-primary btn-outline w-fit mx-auto"
			>
				Ver Accesorios <ShoppingBagIcon className="size-6 inline-block" />
			</Link>
		</section>
	);
}

/**
 * @component
 * @param {{ title: React.ReactNode, desc: React.ReactNode}} props
 * @returns {JSX.Element}
 */
function Accordion({ title, desc }) {
	const [check, setCheck] = useState(false);
	return (
		<div className="join-item collapse collapse-arrow bg-base-200 border border-base-300">
			<input
				type="radio"
				checked={check}
				onChange={() => setCheck((x) => !x)}
			/>
			<h3 className="collapse-title font-semibold">{title}</h3>
			<p className="collapse-content text-sm">{desc}</p>
		</div>
	);
}

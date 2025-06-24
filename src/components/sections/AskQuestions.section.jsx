"use client";
import React, { useState } from "react";
import { SectionTitle } from "../SectionTitle";
import Link from "next/link";
import * as Solid from "@heroicons/react/24/solid";
import * as Out from "@heroicons/react/24/outline";
import { AnchorSectionNames } from "#/constants/anchorSectionNames";

export function AskQuestionsSection() {
	return (
		<section
			id={AnchorSectionNames.FrequentlyAskedQuestions}
			className="container mx-auto p-4 flex flex-col gap-4 items-center"
		>
			<div className="divider divider-primary w-1/3 mx-auto"></div>
			<SectionTitle
				anchorSectionName={AnchorSectionNames.FrequentlyAskedQuestions}
			>
				<span className="underline decoration-primary">Preguntas</span>{" "}
				Frecuentes
			</SectionTitle>
			<div className="join join-vertical max-w-md lg:hidden">
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

			<div className="flex w-full gap-4 justify-center">
				<aside className="w-max space-y-4 flex flex-col justify-around">
					<AsideCard
						title="¿En que lugares solemos trabajar?"
						icon={Out.MapPinIcon}
					>
						<p>
							Por toda la zona de <b>CABA</b>, <b>Matadero</b> y alrededores
						</p>
					</AsideCard>

					<AsideCard title="¿Horarios de atención?" icon={Out.ClockIcon}>
						<p className="text-left">
							De lunes a viernes las <b>24 horas</b>
						</p>
					</AsideCard>
				</aside>
				<div className="flex flex-col justify-center">
					<video
						id="demo1"
						src="/work/demo1.mp4"
						controls
						className="aspect-square rounded-box bg-base-300 border-dashed shadow-md max-w-xs md:max-w-md mx-auto"
					>
						Tu navegador no admite el elemento <code>video</code>.
					</video>
					<label htmlFor="demo1" className="text-center text-sm italic">
						Demostración de Cortina Metálica ya instalada
					</label>
				</div>
				<aside className="w-max space-y-4 flex flex-col justify-around">
					<AsideCard
						title="¿Hasta donde hacen envios?"
						icon={Out.GlobeAmericasIcon}
					>
						<p>Hacemos envios a todo el país.</p>
					</AsideCard>

					<AsideCard
						title="¿Que calidad tienen las Cortinas y Persianas?"
						icon={Out.LockClosedIcon}
					>
						<p>
							Son reforzadas y de calidad industrial de primera categoria, buen
							aislante acústico y térmico
						</p>
					</AsideCard>
				</aside>
			</div>

			<div className="join join-vertical max-w-md lg:hidden">
				<Accordion
					title="¿Horarios de atención?"
					desc={
						<>
							De lunes a viernes las <b>24 horas</b>
						</>
					}
				/>
				<Accordion
					title="¿Que calidad tienen las Cortinas y Persianas?"
					desc="Son reforzadas y de calidad industrial de primera categoria, buen aislante acústico y térmico"
				/>
			</div>

			<div className="divider divider-primary w-1/3 mx-auto"></div>

			<div className="card shadow-sm card-md">
				<div className="card-body p-4">
					<p className="text-center">
						¿Te gustaria ver los accesorios disponibles?
					</p>
					<Link
						href={`#${AnchorSectionNames.Accesories}`}
						className="btn btn-primary btn-outline w-fit mx-auto"
					>
						Ver Accesorios{" "}
						<Solid.ShoppingBagIcon className="size-6 inline-block" />
					</Link>
				</div>
			</div>
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

/**
 * @component
 * @param {import("react").PropsWithChildren<{title: React.ReactNode, icon: React.ReactNode}>} props
 * @returns {JSX.Element}
 */
function AsideCard({ title, icon: Icon, children }) {
	return (
		<div className="hidden lg:card card-lg shadow-md h-max">
			<Icon className="absolute size-12 text-secondary -top-6 left-1/2 -translate-x-1/2" />
			<div className="card-body max-w-xs text-center">
				<h3 className="card-title">{title}</h3>
				{children}
			</div>
		</div>
	);
}

import { SectionTitle } from "../../../../SectionTitle";
import Link from "next/link";
import * as Solid from "@heroicons/react/24/solid";
import * as Out from "@heroicons/react/24/outline";
import { AnchorSectionNames } from "#/constants/AnchorSectionNames";
import { Accordion } from "../../../../Accordion";
import { SectionDivider } from "../../../../SectionDivider";
import { WorkImagePaths } from "#/constants/WorkImagePaths.data";
import Image from "next/image";

export function ChooseUsSection() {
	const Img18 = WorkImagePaths.get(18);
	const Img21 = WorkImagePaths.get(21);
	return (
		<section
			id={AnchorSectionNames.ChooseUs}
			className="container mx-auto p-4 flex flex-col gap-4 items-center"
		>
			<div className="divider divider-primary w-1/3 mx-auto"></div>
			<SectionTitle anchorSectionName={AnchorSectionNames.ChooseUs}>
				¿<span className="underline decoration-primary">Por qué</span> nos
				siguen eligiendo?
			</SectionTitle>
			{/* 
			<div className="join join-vertical max-w-md lg:hidden">
				<Accordion title="¿En que lugares solemos trabajar?">
					Por toda la zona de <b>CABA</b> y <b>Provincia de Buenos Aires</b>
				</Accordion>
				<Accordion title="¿Hasta donde hacen envios?">
					Hacemos envios a <b>todo el país</b>
				</Accordion>
			</div> */}

			<div className="flex w-full gap-4 justify-center">
				<aside className="w-max space-y-4 flex flex-col justify-around">
					<AsideCard
						title="¿En que lugares solemos trabajar?"
						icon={Out.MapPinIcon}
					>
						Por toda la zona de <b>CABA</b> y <b>Provincia de Buenos Aires</b>.
					</AsideCard>

					<AsideCard title="¿Horarios de atención?" icon={Out.ClockIcon}>
						De lunes a viernes las <b>24 horas todos los días</b> del año.
					</AsideCard>
				</aside>

				<figure className="space-y-2">
					<div className="bg-base-300 shadow-md p-1.5 rounded-box max-w-60">
						<Image
							src={Img18.src}
							loading="lazy"
							width={Img18.sizes[0]}
							height={Img18.sizes[1]}
							alt="Mini"
							className="object-cover rounded-box"
						/>
					</div>
				</figure>

				{/* <figure className="space-y-2">
					<div className="flex flex-col justify-center gap-4 2xl:flex-row">
						<video
							id="demo1"
							src="/work/demo1.mp4"
							controls
							controlsList="nodownload noplaybackrate"
							className="aspect-video 2xl:aspect-square rounded-box bg-base-300 border-dashed shadow-md max-w-xs lg:max-w-md mx-auto"
						>
							Tu navegador no admite el elemento <code>video</code>
						</video>
						<video
							id="demo1"
							src="/work/demo5.mp4"
							controls
							controlsList="nodownload noplaybackrate"
							className="aspect-video 2xl:aspect-square rounded-box bg-base-300 border-dashed shadow-md max-w-xs lg:max-w-md mx-auto"
						>
							Tu navegador no admite el elemento <code>video</code>
						</video>
					</div>
					<figcaption className="text-center text-sm italic">
						Demostraciones de Cortina Metálica ya instalada
					</figcaption>
				</figure> */}

				<aside className="w-max space-y-4 flex flex-col justify-around">
					<AsideCard
						title="¿Hasta donde hacen envios?"
						icon={Out.GlobeAmericasIcon}
					>
						Hacemos envios a <b>todo el país</b>
					</AsideCard>

					<AsideCard
						title="¿Que calidad tienen las Cortinas Metálicas?"
						icon={Out.LockClosedIcon}
					>
						Son reforzadas y de calidad industrial de <b>primera categoria</b>,{" "}
						<b>buen aislante</b> acústico y térmico.
					</AsideCard>
				</aside>
			</div>

			{/* <div className="join join-vertical max-w-md lg:hidden">
				<Accordion title="¿Horarios de atención?">
					De lunes a viernes las <b>24 horas</b> todos los días del año
				</Accordion>
				<Accordion title="¿Que calidad tienen las Cortinas Metálicas?">
					Son reforzadas y de calidad industrial de primera categoria, buen
					aislante acústico y térmico
				</Accordion>
			</div> */}

			<SectionDivider />

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
 * @param {import("react").PropsWithChildren<{title: React.ReactNode, icon: React.ReactNode}>} props
 * @returns {JSX.Element}
 */
function AsideCard({ title, icon: Icon, children }) {
	return (
		<div className="hidden lg:card card-lg shadow-md h-max">
			<Icon className="absolute size-12 text-secondary -top-6 left-1/2 -translate-x-1/2" />
			<div className="card-body max-w-xs text-center">
				<h3 className="card-title">{title}</h3>
				<p>{children}</p>
			</div>
		</div>
	);
}

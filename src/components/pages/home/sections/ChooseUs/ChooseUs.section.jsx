import { SectionTitle } from "../../../../SectionTitle";
import Link from "next/link";
import * as Solid from "@heroicons/react/24/solid";
import * as Out from "@heroicons/react/24/outline";
import { AnchorSectionNames } from "#/constants/AnchorSectionNames";
import { SectionDivider } from "../../../../SectionDivider";
import { WorkImagePaths } from "#/constants/WorkImagePaths.data";
import Image from "next/image";

export function ChooseUsSection() {
	const Img18 = WorkImagePaths.get(18);
	const Img2 = WorkImagePaths.get(2);
	const Img17 = WorkImagePaths.get(20);

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

			<div className="card shadow-sm card-md">
				<p className="card-body p-4 max-w-paragraph mx-auto text-center">
					Tenemos un extenso historial de trabajos realizados a lo largo de los
					años, garantizamos buena calidad, precio y tiempo de respuesta.
				</p>
			</div>
			{/* Desktop */}
			<div className="hidden lg:flex gap-4">
				<div className="flex w-max flex-col justify-around">
					<AsideCard
						title="¿En que lugares solemos trabajar?"
						icon={Out.MapPinIcon}
					>
						Por toda la zona de <b>CABA</b> y <b>Provincia de Buenos Aires</b>.
					</AsideCard>

					<AsideCard title="¿Horarios de atención?" icon={Out.ClockIcon}>
						De lunes a viernes las <b>24 horas todos los días</b> del año.
					</AsideCard>
				</div>
				<figure className="bg-base-300 shadow-md p-1 rounded-box max-w-60 my-auto">
					<Image
						src={Img18.src}
						loading="lazy"
						width={Img18.sizes[0]}
						height={Img18.sizes[1]}
						alt="Un señor instalando una persiana automática en un local"
						className="object-cover rounded-box"
					/>
				</figure>
				<div className="space-y-2">
					<figure className="bg-base-300 shadow-md p-1 rounded-box max-w-60">
						<Image
							src={Img2.src}
							loading="lazy"
							width={Img2.sizes[0]}
							height={Img2.sizes[1]}
							alt="Figura de un señor trabajando en la instalación de una cortina metálica"
							className="object-cover rounded-box"
						/>
					</figure>
					<figure className="bg-base-300 shadow-md p-1 rounded-box max-w-60">
						<Image
							src={Img17.src}
							loading="lazy"
							width={Img17.sizes[0]}
							height={Img17.sizes[1]}
							alt="Un señor contemplando dos cortinas metalicas gigantes"
							className="object-cover rounded-box"
						/>
					</figure>
				</div>
				<div className="flex w-max flex-col justify-around">
					<AsideCard
						title="¿En que lugares solemos trabajar?"
						icon={Out.MapPinIcon}
					>
						Por toda la zona de <b>CABA</b> y <b>Provincia de Buenos Aires</b>.
					</AsideCard>

					<AsideCard
						title="¿Que calidad tienen las Cortinas Metalicas?"
						icon={Out.LockClosedIcon}
					>
						Son reforzadas y de calidad industrial de <b>primera categoria</b>,{" "}
						<b>buen aislante</b> acústico y térmico.
					</AsideCard>
				</div>
			</div>

			{/* Mobile */}
			<div className="flex lg:hidden gap-2">
				<div className="flex flex-col gap-4 place-items-end justify-around">
					<figure className="bg-base-300 shadow-md p-1.5 rounded-box max-w-60">
						<Image
							src={Img18.src}
							loading="lazy"
							width={Img18.sizes[0]}
							height={Img18.sizes[1]}
							alt="Un señor instalando una persiana automática en un local"
							className="object-cover rounded-box"
						/>
					</figure>
					<AsideCard title="¿Hasta donde hacen envios?" icon={Out.GiftIcon}>
						Hacemos envios a <b>todo el país</b>.
					</AsideCard>
					<AsideCard title="¿Horarios de atención?" icon={Out.ClockIcon}>
						De lunes a viernes las <b>24 horas todos los días</b> del año.
					</AsideCard>
				</div>
				<div className="flex flex-col gap-4 place-items-start justify-around">
					<AsideCard
						title="¿En que lugares solemos trabajar?"
						icon={Out.MapPinIcon}
					>
						Por toda la zona de <b>CABA</b> y <b>Provincia de Buenos Aires</b>.
					</AsideCard>

					<AsideCard
						title="¿Que calidad tienen las Cortinas Metalicas?"
						icon={Out.LockClosedIcon}
					>
						Son reforzadas y de calidad industrial de <b>primera categoria</b>,{" "}
						<b>buen aislante</b> acústico y térmico.
					</AsideCard>
					<figure className="bg-base-300 shadow-md p-1.5 rounded-box max-w-60">
						<Image
							src={Img2.src}
							loading="lazy"
							width={Img2.sizes[0]}
							height={Img2.sizes[1]}
							alt="Figura de un señor trabajando en la instalación de una cortina metálica"
							className="object-cover rounded-box"
						/>
					</figure>
				</div>
			</div>
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
			<SectionDivider />
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
		<div className={"card card-sm shadow-md h-max"}>
			<Icon className="absolute size-6 lg:size-12 text-secondary -top-1.5 lg:-top-8 left-1/2 -translate-x-1/2" />
			<div className="card-body max-w-xs text-center">
				<h3 className="card-title">{title}</h3>
				<p>{children}</p>
			</div>
		</div>
	);
}

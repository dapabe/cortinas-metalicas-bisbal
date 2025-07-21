import { AnchorSectionNames } from "#/constants/AnchorSectionNames";
import { AccesoryCardList } from "../AccesoryCardList";
import { SectionTitle } from "../SectionTitle";

export function AccesorySection() {
	return (
		<section
			id={AnchorSectionNames.Accesories}
			className="container mx-auto p-4 space-y-4"
		>
			<SectionTitle anchorSectionName={AnchorSectionNames.Accesories}>
				<span className="underline decoration-primary">Accesorios</span> a la
				venta
			</SectionTitle>
			<AccesoryCardList />

			<div className="card shadow-sm card-md lg:w-max lg:mx-auto">
				<div className="card-body p-4 max-w-paragraph mx-auto">
					<p className="text-center text-wrap">
						Si desea consultar por precios o por algún accesorio que no se
						encuentre en venta, no dude en contactarnos por{" "}
						<span className="underline underline-offset-2">WhatsApp</span> o
						consultar nuestro servicio en{" "}
						<span className="underline underline-offset-2">Mercado Libre</span>.
					</p>
					{/* <Link
						href={`#${AnchorSectionNames.Accesories}`}
						className="btn btn-primary btn-outline w-fit mx-auto"
					>
						Ver Accesorios{" "}
						<Solid.ShoppingBagIcon className="size-6 inline-block" />
					</Link> */}
				</div>
			</div>

			<div className="divider divider-primary w-1/3 mx-auto"></div>
		</section>
	);
}

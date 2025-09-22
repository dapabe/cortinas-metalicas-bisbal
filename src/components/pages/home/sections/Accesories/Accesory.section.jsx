import { AnchorSectionNames } from "#/constants/AnchorSectionNames";
import { AccesoryCardList } from "../../../../AccesoryCardList";
import { SectionDivider } from "../../../../SectionDivider";
import { SectionTitle } from "../../../../SectionTitle";

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
						<Bold>WhatsApp</Bold> o <Bold>correo electronico</Bold>
						{/* o consultar nuestro servicio en <Underlined>Mercado Libre</Underlined> */}
						.
					</p>
				</div>
			</div>

			<SectionDivider />
		</section>
	);
}

/**
 * @component
 * @param {import("react").PropsWithChildren} props
 */
function Bold({ children }) {
	return <b className="text-primary-content bg-primary px-1"> {children}</b>;
}

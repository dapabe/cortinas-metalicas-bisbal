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
			<div className="divider divider-primary w-1/3 mx-auto"></div>
		</section>
	);
}

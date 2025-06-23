import { AccesoryCardList } from "../AccesoryCardList";
import { SectionTitle } from "../SectionTitle";

export function AccesorySection() {
	return (
		<section id="accesorios" className="container mx-auto p-4 space-y-4">
			<SectionTitle>
				<span className="underline decoration-primary">Accesorios</span> a la
				venta
			</SectionTitle>
			<AccesoryCardList />
		</section>
	);
}

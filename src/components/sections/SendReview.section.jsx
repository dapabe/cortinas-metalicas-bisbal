import { MessageReviewForm } from "../MessageReview.form";

export function SendReviewSection() {
	return (
		<section className="container mx-auto p-4 flex items-center flex-col md:flex-row md:justify-center gap-4 lg:gap-12">
			<article className="max-w-sm">
				<h2 className="text-2xl font-semibold text-center mb-2">
					¡<span className="underline decoration-primary">Tu opinión</span> nos
					importa!
				</h2>
				<p className="text-lg">
					Valoramos profundamente tu experiencia con nosotros. Si tienes un
					momento, ¿
					<span className="underline decoration-primary decoration-2">
						te gustaría compartir tu opinión
					</span>
					? Tu reseña no solo nos inspira, sino que también guía a futuros
					clientes.
				</p>
				<p className="text-lg text-center">¡Agradecemos tu apoyo!</p>
			</article>
			<MessageReviewForm />
		</section>
	);
}

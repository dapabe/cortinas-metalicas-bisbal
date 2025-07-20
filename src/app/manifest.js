/** @returns {import("next").MetadataRoute.Manifest} */
export default function manifest() {
	return {
		name: "Cortinas Metálicas Bisbal",
		short_name: "Cortinas Bisbal",
		description:
			"Instalación, reparación y mantenimiento de cortinas metálicas por todo CABA y venta de articulos por toda Argentina. Abierto las 24 horas.",
		lang: "es-AR",
		dir: "ltr",
		start_url: "/",
		display: "standalone",
		theme_color: "#ffffff",
		background_color: "#ffffff",
		icons: [
			{
				src: "/favicon.ico",
				sizes: "any",
				type: "image/x-icon",
			},
		],
	};
}

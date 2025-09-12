/** @returns {import("next").MetadataRoute.Manifest} */
export default function manifest() {
	return {
		name: "Cortinas Metálicas Bisbal",
		short_name: "Cortinas Bisbal",
		description:
			"Instalación, reparación y mantenimiento de cortinas metálicas por todo CABA, Provincia y venta de articulos por toda Argentina. Abierto las 24 horas.",
		lang: "es-AR",
		dir: "ltr",
		display: "standalone",
		theme_color: "#ffffff",
		background_color: "#ffffff",
		shortcuts: [
			{
				name: "Cortinas Bisbal Backoffice",
				short_name: "Bisbal Backoffice",
				description: "Acceso al panel de Personal Autorizado",
				url: "/backoffice",
				icons: [
					{
						src: "/favicon.ico",
						sizes: "any",
						type: "image/x-icon",
					},
				],
			},
		],
		icons: [
			{
				src: "/favicon.ico",
				sizes: "any",
				type: "image/x-icon",
			},
		],
	};
}

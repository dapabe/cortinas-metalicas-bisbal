/** @returns {import("next").MetadataRoute.Robots} */
export default function robots() {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: [
				"/api",
				"/login",
				"/backoffice",
				"/Segoe UI Bold.ttf",
				"/Segoe UI.ttf",
			],
		},
		sitemap: "https://www.cortinasbisbal.com.ar/sitemap.xml",
	};
}

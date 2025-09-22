/** @returns {import("next").MetadataRoute.Robots} */
export default function robots() {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/api", "/sign-up", "/backoffice"],
		},
		sitemap: "https://www.cortinasbisbal.com.ar/sitemap.xml",
	};
}

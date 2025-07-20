/** @returns {import("next").MetadataRoute.Robots} */
export default function robots() {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/api/", "/work/demo1.mp4", "/work/demo5.mp4"],
		},
		sitemap: "https://www.cortinasbisbal.com.ar/sitemap.xml",
	};
}

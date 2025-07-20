/** @returns {import("next").MetadataRoute.Sitemap} */
export default function sitemap() {
	return [
		{
			url: "https://www.cortinasbisbal.com.ar",
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
			images: ["https://www.cortinasbisbal.com.ar/work/cortina6.jpg"],
		},
	];
}

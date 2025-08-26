/** @type {import('next').NextConfig} */
const nextConfig = {
	devIndicators: false,
	compiler: {
		removeConsole: false,
	},

	images: {
		formats: ["image/avif", "image/webp"],
		minimumCacheTTL: 2678400, // 31 days
		localPatterns: [
			{
				pathname: "/work/**",
				search: "",
			},
			{
				pathname: "/accesory/**",
				search: "",
			},
		],
	},
};

// Prevent these routes from navigation
// if (process.env.NODE_ENV === "production") {
// 	nextConfig.redirects = async () => [
// 		{ source: "/backoffice/", destination: "/", permanent: true },
// 		{ source: "/backoffice/login", destination: "/", permanent: true },
// 	];
// }

export default nextConfig;

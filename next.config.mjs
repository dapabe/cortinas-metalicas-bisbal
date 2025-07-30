/** @type {import('next').NextConfig} */
const nextConfig = {
	devIndicators: false,
	compiler: {
		removeConsole: false,
	},
	images: {
		formats: ["image/webp", "image/avif"],
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

export default nextConfig;

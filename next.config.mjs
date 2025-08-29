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
	// webpack: (config) => {
	// 	config.module.rules.push({
	// 		test: /\.pdf$/,
	// 		type: "asset/resource",
	// 		generator: {
	// 			filename: "static/[hash][ext]",
	// 		},
	// 	});
	// 	return config;
	// },
};

export default nextConfig;

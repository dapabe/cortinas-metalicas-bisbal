import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
	devIndicators: false,
	images: {
		formats: ["image/webp"],
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
	webpack: (config) => {
		config.resolve.alias["#const"] = path.resolve(__dirname, "./src/constants");
		return config;
	},
};

export default nextConfig;

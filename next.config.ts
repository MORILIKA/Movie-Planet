import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	compress: true,
	images: {
		remotePatterns: [new URL(`https://image.tmdb.org/**`)],
		unoptimized: false,
	},
};

export default nextConfig;

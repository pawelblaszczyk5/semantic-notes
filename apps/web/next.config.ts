import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	devIndicators: {
		appIsrStatus: false,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	experimental: {
		after: true,
		dynamicIO: true,
		ppr: true,
		reactCompiler: true,
		taint: true,
	},
	typescript: {
		tsconfigPath: "./tsconfig.app.json",
	},
};

export default nextConfig;

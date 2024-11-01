import type { NextConfig } from "next";

const nextConfig = {
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
		ignoreBuildErrors: true,
		tsconfigPath: "./tsconfig.app.json",
	},
} satisfies NextConfig;

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
		ignoreBuildErrors: true, // Ignore TypeScript errors during build
	},
	eslint: {
		ignoreDuringBuilds: true, // Disable linting during build
	},
};

export default nextConfig;

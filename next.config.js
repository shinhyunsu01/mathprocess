/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["imagedelivery.net", "upload.imagedelivery.net"],
	},
};

module.exports = nextConfig;

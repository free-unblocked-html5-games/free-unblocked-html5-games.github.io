/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "export",
  basePath: "/free-unblocked-html5-games.github.io",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

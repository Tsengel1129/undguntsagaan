import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the tracing root to this project (a stray lockfile exists in $HOME).
  outputFileTracingRoot: path.resolve(),
  images: {
    // Allow optimized remote loading of the Unsplash photos used site-wide.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

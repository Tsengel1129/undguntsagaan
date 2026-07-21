import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the tracing root to this project (a stray lockfile exists in $HOME).
  outputFileTracingRoot: path.resolve(),
  images: {
    remotePatterns: [
      // Unsplash photos used by the seeded content.
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Firebase Storage download-token URLs for admin-uploaded images.
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      // Admins can also paste image URLs from any https host.
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;

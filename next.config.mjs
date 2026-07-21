import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the tracing root to this project (a stray lockfile exists in $HOME).
  outputFileTracingRoot: path.resolve(),
  // Keep firebase-admin (and its deps jwks-rsa → jose, which is ESM-only) out
  // of the serverless bundle so Node loads them natively from node_modules.
  // Without this, jwks-rsa's require('jose') hits the ESM build in the bundled
  // function and crashes at runtime with ERR_REQUIRE_ESM (the /api/auth/session
  // 500 that broke admin login on Vercel).
  serverExternalPackages: ["firebase-admin"],
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

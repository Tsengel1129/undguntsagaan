import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the tracing root to this project (a stray lockfile exists in $HOME).
  outputFileTracingRoot: path.resolve(),
};

export default nextConfig;

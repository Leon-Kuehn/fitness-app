import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/fitness-app",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

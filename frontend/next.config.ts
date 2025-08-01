import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript errors during builds  
    ignoreBuildErrors: true,
  },
  experimental: {
    // Disable strict mode that might cause ESLint issues
    typedRoutes: false,
  },
  /* config options here */
};

export default nextConfig;

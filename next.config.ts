import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pinimg.com'
      },
      {
        protocol: 'https',
        hostname: 'ztnnwxdhsp.ufs.sh'
      }
    ]
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["*.devtunnels.ms", "localhost:3000"], 
    },
  },
};

export default nextConfig;

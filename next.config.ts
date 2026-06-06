import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow external images from ImageKit CDN
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;

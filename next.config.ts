import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "heroui.com",
      },
      {
        protocol: "https",
        hostname: "letsenhance.io",
      },
      {
        protocol: "https",
        hostname: "avatar.vercel.sh",
      },
      {
        protocol:"https",
        hostname:"i.pinimg.com"
      }
    ],
  },
};

export default nextConfig;

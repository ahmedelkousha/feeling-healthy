import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["192.168.1.9:3000", "192.168.1.9", "localhost:3000", "192.168.1.46"],
};

export default nextConfig;

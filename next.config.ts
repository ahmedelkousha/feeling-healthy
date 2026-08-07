import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["192.168.1.5:3000", "192.168.1.5", "localhost:3000"],
};

export default nextConfig;

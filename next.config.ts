import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    // Note: In newer Next.js versions, this might be a top-level config or 
    // strictly under 'experimental' depending on your exact version.
    serverActions: {
      bodySizeLimit: '200mb', // Set your desired limit (e.g., '4mb', '10mb')
    },
  },
};

export default nextConfig;

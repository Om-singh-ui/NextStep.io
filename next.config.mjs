/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: { 
      bodySizeLimit: "2mb" 
    },
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // ADD THESE OPTIONS TO HELP WITH BUILD ISSUES:
  output: 'standalone', // Creates optimized standalone build
  swcMinify: true, // Use SWC for faster minification
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console logs in production
  },
  // Handle large chunks warning
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxSize: 200000, // 200kb
      };
    }
    return config;
  },
};

export default nextConfig;
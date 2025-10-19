/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // optional but recommended
  turbopack: false,
  webpack: (config, { isServer }) => {
    return config;
  },
};

export default nextConfig;

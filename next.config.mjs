/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: { enabled: false }, // disable Turbopack correctly
  },
};

export default nextConfig;

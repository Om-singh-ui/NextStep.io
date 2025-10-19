/** @type {import('next').NextConfig} */
const nextConfig = {
  // This tells Next.js to use Webpack for the production build
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.builtins = config.builtins || {};
      config.builtins.turbo = false; // disables Turbopack client-side
    }
    return config;
  },
};

export default nextConfig;

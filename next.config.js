/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.csv$/,
      use: 'csv-loader',
    });

    return config;
  },
};

module.exports = nextConfig;
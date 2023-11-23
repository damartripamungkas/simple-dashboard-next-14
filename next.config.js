/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    // ignore formidable warnings
    config.ignoreWarnings = [
      { module: /node_modules\/sequelize/ },
      { file: /node_modules\/sequelize/ },
      { module: /node_modules\/mariadb/ },
      { file: /node_modules\/mariadb/ },
    ];

    return config;
  },
};

module.exports = nextConfig;

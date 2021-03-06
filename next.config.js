const { i18n } = require("./next-i18next.config");
/** @type {import('next').NextConfig} */

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  i18n,
  reactStrictMode: true,
  images: {
    domains: ["storage.googleapis.com"],
  },
};

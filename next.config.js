const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  sentry: {
    hideSourceMaps: true,
    widenClientFileUpload: true,
    disableLogger: true,
    automaticVercelMonitors: true,
  },
};

module.exports = withSentryConfig(nextConfig);

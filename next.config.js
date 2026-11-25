const { publicApiRewrites } = require("./public-api-origin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@tanstack/react-query", "@tanstack/query-core"],
  async redirects() {
    return [
      {
        source: "/terms",
        destination: "/legal/terms-of-service",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/legal/privacy-policy",
        permanent: true,
      },
      {
        source: "/auth/callback",
        destination: "/app/auth/callback",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return {
      // PAPI-001: the public API goes straight to the Skout API, before any of this site's own routes.
      beforeFiles: publicApiRewrites(),
      afterFiles: [
        { source: "/app", destination: "/api/workspace-proxy" },
        { source: "/app/:path*", destination: "/api/workspace-proxy/:path*" },
      ],
    };
  },
};

module.exports = nextConfig;

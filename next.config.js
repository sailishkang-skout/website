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
    ];
  },
  async rewrites() {
    return [
      { source: "/app", destination: "/api/workspace-proxy" },
      { source: "/app/:path*", destination: "/api/workspace-proxy/:path*" },
    ];
  },
};

module.exports = nextConfig;

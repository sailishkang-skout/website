/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@tanstack/react-query", "@tanstack/query-core"],
  async redirects() {
    return [
      // Old root URLs redirect to new organized compliance URLs
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
};

module.exports = nextConfig;

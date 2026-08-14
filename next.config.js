/** @type {import('next').NextConfig} */
const workspaceOrigin = (
  process.env.NEXT_PUBLIC_WORKSPACE_URL ||
  "https://ckoy6iywm0.execute-api.us-east-1.amazonaws.com"
).replace(/\/$/, "");

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
      {
        source: "/app",
        destination: `${workspaceOrigin}/app`,
      },
      {
        source: "/app/:path*",
        destination: `${workspaceOrigin}/app/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;

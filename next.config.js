/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "nobadleads.com" }],
        destination: "https://www.nobadleads.com/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

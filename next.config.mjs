/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  distDir: process.env.NEXT_DIST_DIR || ".next",
  experimental: {
    // Trace PDF.js assets (cmaps, standard fonts) into the serverless bundles
    // that serve them at runtime.
    outputFileTracingIncludes: {
      "/**/*": ["./public/pdfjs/**/*"],
      "/pdfjs/[...path]": ["./public/pdfjs/**/*"],
    },
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,POST,PUT,DELETE" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization, X-Requested-With" },
        ],
      },
    ];
  },
};

export default nextConfig;

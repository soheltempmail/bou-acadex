/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  distDir: process.env.NEXT_DIST_DIR || ".next",
  experimental: {
    // Tracing static files and PDF.js assets into Vercel serverless bundles
    outputFileTracingIncludes: {
      "/*": ["./static/**/*"],
      "/beta/**/*": ["./public/pdfjs/**/*"],
      "/pdfjs/[...path]": ["./public/pdfjs/**/*"],
      "/api/**/*": ["./static/**/*", "./public/pdfjs/**/*"],
    },
  },
  async rewrites() {
    return [
      {
        source: "/beta/api/:path*",
        destination: "/api/:path*",
      },
      {
        source: "/beta/pdfjs/:path*",
        destination: "/pdfjs/:path*",
      },
    ];
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
      {
        source: "/beta/api/:path*",
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

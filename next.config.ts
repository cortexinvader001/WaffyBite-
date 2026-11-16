import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static site: `npm run build` writes plain HTML, CSS and JS to ./out
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

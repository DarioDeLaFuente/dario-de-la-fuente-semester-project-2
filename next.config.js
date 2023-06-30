/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  pageExtensions: ["jsx", "js", "ts", "tsx", "mdx"],
};

module.exports = nextConfig;

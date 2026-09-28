/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  ...(process.env.NODE_ENV === "production" ? { basePath: "/portfolio-v3" } : {}),
};

export default nextConfig;

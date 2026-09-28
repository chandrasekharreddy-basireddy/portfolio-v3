/** @type {import('next').NextConfig} */
const repoName = "portfolio-v3";
const isGithubPagesBuild = process.env.GITHUB_ACTIONS === "true";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  ...(isGithubPagesBuild ? { basePath: `/${repoName}` } : {}),
};

export default nextConfig;

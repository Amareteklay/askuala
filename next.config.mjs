import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  // Windows dev environments here kill the parallel jest-worker child
  // processes Next.js spawns for page generation, crashing the worker
  // pool ("Jest worker encountered N child process exceptions"). Running
  // everything in a single worker avoids the child-process spawn entirely.
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);

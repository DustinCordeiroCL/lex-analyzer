import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pdf-parse", "mammoth", "@libsql/client", "@prisma/adapter-libsql", "@prisma/client"],
};

export default nextConfig;

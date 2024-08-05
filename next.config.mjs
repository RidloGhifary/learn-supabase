/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uwdahihewxfaozjegprk.supabase.co",
        port: "",
        pathname: "/*/**",
      },
    ],
  },
};

export default nextConfig;

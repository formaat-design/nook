import withNook from "nook-integration-next";

/** @type {import('next').NextConfig} */
const nextConfig = withNook()({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
});

export default nextConfig;

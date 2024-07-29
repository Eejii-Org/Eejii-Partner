/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_SERVER_BACKEND_URL: process.env.NEXT_SERVER_BACKEND_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2mstmber8qwm7.cloudfront.net",
        port: "",
        pathname: "**",
      },
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  serverRuntimeConfig: {
    baseUrl: process.env.NEXT_SERVER_BACKEND_URL,
  },
  publicRuntimeConfig: {
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
};

export default nextConfig;

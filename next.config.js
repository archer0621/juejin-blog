/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "101.42.229.5",
        port: "1337",
        pathname: "/**"
      }
    ]
  }
}
module.exports = nextConfig

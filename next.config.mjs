/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // ⚠️ Supprime appDir et metadata (incompatibles avec Next 16)
  },
}

export default nextConfig

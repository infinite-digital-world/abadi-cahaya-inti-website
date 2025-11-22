/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  // For Cloudflare Pages compatibility
  // Use 'standalone' for server-side features, or 'export' for static export
  // output: process.env.CF_PAGES ? 'standalone' : undefined,
}

module.exports = nextConfig


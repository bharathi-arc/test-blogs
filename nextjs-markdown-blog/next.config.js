/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/my-blog', // important for GitHub Pages
    images: {
      unoptimized: true, // avoids Next.js Image Optimization which doesn't work in static export
    },
  };
  
  module.exports = nextConfig;
  
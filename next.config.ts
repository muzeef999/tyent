/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      turbo: false,
    },
    env: {
      MONGODB_URI: process.env.MONGODB_URI,
    },
  
  };

  
  
  module.exports = nextConfig;
  
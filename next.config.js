/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io']
  },
  env: {
    API_URL: process.env.API_URL,
    COOKIE_NAME: process.env.COOKIE_NAME
  }
};

module.exports = nextConfig;

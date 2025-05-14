/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/article',
        permanent: true // atau false
      }
    ];
  },
  images: {
    domains: ['utfs.io', 'mycbuckethris.s3.ap-southeast-2.amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mycbuckethris.s3.amazonaws.com',
        port: '',
        pathname: '/*'
      }
    ]
  },
  env: {
    API_URL: process.env.API_URL,
    COOKIE_NAME: process.env.COOKIE_NAME
  }
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/daxzzj8lh/image/upload/**',
      },
    ],
  },
};

export default nextConfig;

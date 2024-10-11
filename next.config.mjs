// @ts-check
 
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    /* config options here */
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: '127.0.0.1',
          port: '9199',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'firebasestorage.googleapis.com',
          pathname: '/**',
        },
      ],
    },
  }
   
  export default nextConfig
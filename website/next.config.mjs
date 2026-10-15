const BACKEND_URL = process.env.INTERNAL_BACKEND_URL || 'http://localhost:5400';

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/api/v1/:path*', destination: `${BACKEND_URL}/api/v1/:path*` },
      { source: '/uploads/:path*', destination: `${BACKEND_URL}/uploads/:path*` },
    ];
  },
};

export default nextConfig;

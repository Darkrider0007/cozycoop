/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // This setting should be false if you want ESLint checks to run during builds
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uwvjmh7qlrugtdhk.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;

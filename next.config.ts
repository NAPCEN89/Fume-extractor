// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'res.cloudinary.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 'images.unsplash.com',
//       },
//     ],
//   },
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // <-- Add this line here
  images: {
    unoptimized: true, // <-- Required for static export when using next/image
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '://cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '://unsplash.com',
      },
    ],
  },
};

export default nextConfig;

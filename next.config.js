/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:['lwlies.com',
    'lh3.googleusercontent.com'
  ],//this going to allow next.js render images
  }
}

module.exports = nextConfig

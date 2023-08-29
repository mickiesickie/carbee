/** @type {import('next').NextConfig} */
const baseURL = 'https://backend.billowing-truth-38ad.workers.dev'
const nextConfig = {
  /*async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: `${baseURL}` },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT'
          }
        ]
      }
    ]
  },*/
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${baseURL}/api/:path*`
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true
      },
      {
        source: '/dashboard',
        has: [
          {
            type: 'cookie',
            key: 'token'
          }
        ],
        destination: '/login',
        permanent: false
      }
    ]
  }
}

module.exports = nextConfig

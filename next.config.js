/** @type {import("next").NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const runtimeCaching = require('next-pwa/cache')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
})

const nextConfig = withPWA({
    reactStrictMode: true,
    productionBrowserSourceMaps: true,
    images: {
        domains: [
            '127.0.0.1',
            'localhost',
            'viajaflux.com.br',
            'app.viajaflux.com.br',
            'viajaflux.test',
            'app.viajaflux.test',
            'i.ytimg.com',
            'd1b157sx3b6kqr.cloudfront.net',
            'assets.viajaflux.com.br',
        ],
    },
})

module.exports = nextConfig

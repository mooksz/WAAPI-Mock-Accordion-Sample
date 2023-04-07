/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
    experimental: {
        appDir: true,
    },
    images: {
        formats: ['image/avif', 'image/webp'],
    },
};

module.exports = nextConfig;

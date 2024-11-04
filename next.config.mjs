/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        // Only include externals if needed for specific use cases
        config.externals.push({
            "utf-8-validate": "commonjs utf-8-validate",
            "bufferutil": "commonjs bufferutil"
        });

        return config;
    },
    async headers() {
        return [
            {
                source: '/api/socket/io',
                headers: [
                    { key: 'Connection', value: 'upgrade' },
                    { key: 'Upgrade', value: 'websocket' },
                ],
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "your-trusted-source.com", // replace with actual hostname
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "**", // This allows all HTTPS hosts
            },
        ],
        
            domains: ["uploadthing.com"]
        
      
    },
};

export default nextConfig;

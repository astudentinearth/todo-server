/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites(){
        return [{
            source: "/api/v1/:path*",
            destination: "http://localhost:9768/api/v1/:path*"
        }]
    }
}

module.exports = nextConfig

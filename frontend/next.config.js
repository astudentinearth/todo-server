/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites(){
        return [{
            source: "/api/v1/:path*",
            destination: "http://192.168.1.38:9768/api/v1/:path*"
        }]
    }
}

module.exports = nextConfig

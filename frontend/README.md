### Frontend configuration
You can change the hostname for API calls using rewrites in `next.config.js`
```js
async rewrites(){
        return [{
            source: "/api/v1/:path*",
            destination: "http://localhost:9768/api/v1/:path*"
        }]
    }
```
Change the `destination` field accordingly to the hostname/port the backend is served.

### Running the frontend
Run `npm run dev` in this directory.
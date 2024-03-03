## Set up with Docker
Use the included `docker-compose.yml` file to get a server running immediately.  
### Requirements
- Docker Compose
- (ideally) a Linux system

### Setup
Update the variables in .env.example with the credentials you want to use.
**Set your Postgres credentials before running compose. They need to be present at database creation.** 
When you are done setting environment variables, make sure the file is named to `.env`  

Run the application with
```
docker compose up
```

## Manual setup (not recommended)
This method requires a lot of action by you, so I recommend sticking to the Docker path instead. You will need build tools to be present on your system.
### Requirements
- A Postgresql server
- A Redis server
- HTTP server of your choice if you want to use a proxy/use HTTPS
- Node.js 18.17 or higher (required by Next.js)
- npm

### Database
- Create a Postgres database and run the queries inside [init.sql](/init.sql)
- Provide a Redis connection string. Redis database doesn't need further configuration.

### Build
Run the command below to build the Next.js application.
```bash
npm run prisma:generate
npm run build
```
`.next` directory will appear with build files inside.

### Run the app
The standalone build contains the server script. Run it with Node.
```bash
cd .next/standalone
node .next/standalone/server.js
```

## How to set up HTTPS
To use HTTPS, update the included nginx configuration to use a certificate. You may want to disable the HTTP endpoint and only serve over HTTPS.  
The recommended way to use SSL is with certbot. 
You can set up certbot in your host system and mount the necessary certificates by adding them to volumes of todoapp-nginx service.  

### Useful links
[Certbot](https://certbot.eff.org/)  
[Nginx docs on HTTPS configuration](http://nginx.org/en/docs/http/configuring_https_servers.html)  
[Let's Encrypt](https://letsencrypt.org/)
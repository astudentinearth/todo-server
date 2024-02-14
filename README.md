# Self hosted todo
*My attempt at learning Next.js*  
*This is **NOT** production ready software. Vulnerabilities may be present. Do not use this for storing critical information.*

## Features
- [X] User accounts
- [X] Todos (with editable text)
- [X] Session management (log out all devices)
- [X] Change username and password
- [X] Data export
- [X] Account deletion
- [ ] Rate limiting with Redis
- [X] Quick setup with Docker compose

### Tech stack
- Next.js 14
- Prisma
- Tailwind
- Postgres
- Lucia-auth
- Redis

### Environment configuration
```bash
POSTGRES_PASSWORD = "password" # password for postgres
POSTGRES_USER = "postgres_username" # username for postgres
POSTGRES_DB = "todoapp" # database to use
PG_HOST = "127.0.0.1" # hostname for postgres
PG_PORT = "5432" # port for database connection
DATABASE_URL = "postgresql://user:password@localhost:5432/todoapp?schema=public" # database URL for prisma
REDIS_URL = "redis://user:password@localhost:6379" # connection string for redis
REDIS_PASSWORD = "password" # password for redis
```

Make sure to protect your secrets well 😼  
### Running with Docker
- Change `PG_HOST` to `db` and change your connection string to match that.
- Provide a connection URL to Redis
- Run `docker compose up`  

You should be good to go  

### Database configuration
When using Docker compose, the database will be set up automatically for you. You don't need to touch the SQL files. 
If you are using a different Postgres server, use `init.sql` to set up the tables and remove the `db` service if you want to.  
If you have a Redis instance somewhere else, pass the connection URL for it.
# Self hosted todo
*My attempt at learning Next.js*  
*This is **NOT** production ready software. Vulnerabilities may be present. Do not use this for storing critical information.*

## Features
- [X] User accounts
- [X] Todos
- [X] Editable todos
- [X] Session management (log out all devices)
- [ ] Change username and password
- [ ] Data export
- [ ] Account deletion
- [ ] Rate limiting with a Redis database
- [ ] Easy setup with Docker

### Tech stack
- Next.js 14
- Prisma
- Tailwind
- Postgres
- Lucia-auth

### Environment configuration
```bash
POSTGRES_PASSWORD = "password" # password for postgres
POSTGRES_USER = "postgres_username" # username for postgres
POSTGRES_DB = "todoapp" # database to use
PG_HOST = "127.0.0.1" # hostname for postgres
PG_PORT = "5432" # port for database connection
DATABASE_URL = "postgresql://user:password@localhost:5432/todoapp?schema=public" # database URL for prisma
```

Make sure to protect your secrets well 😼
### Database configuration
You need to set up a Postgres database for this application. You can use the sql files included here to quickly set the database up.
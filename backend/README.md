### Environment configuration
Create a .env file in this directory for required variables to be loaded - dotenv will load them at startup (see index.js)

```bash
PG_PASSWORD = "password" # password for postgres
PG_USERNAME = "postgres_username" # username for postgres
PG_HOST = "127.0.0.1" # hostname for postgres
PG_PORT = "5432" # port for database connection
TODO_SESSION_KEY = "session_cookie_secret" # secret used to sign the session cookie
```

Make sure to protect your secrets well 😼

### Running backend only
Run `npm run dev` here.

### Database configuration
You need to set up a Postgres database for this application.

Required tables:
```
users | username: varchar | password: varchar | id: int (unique)

todos | id: int (unique) | userID: varchar | content: varchar | completed: bool
```
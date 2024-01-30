import { Lucia } from "lucia";
import { NodePostgresAdapter } from "@lucia-auth/adapter-postgresql";
import pg from "pg";

const pool = new pg.Pool({
    user: process.env["POSTGRES_USER"],
    password: process.env["POSTGRES_PASSWORD"],
    database: process.env["POSTGRES_DATABASE"],
    host: process.env["PG_HOST"],
    port: Number(process.env["PG_PORT"]) ?? 5432,
    min: 2
});

const adapter = new NodePostgresAdapter(pool,{
    user: "users",
    session: "user_sessions"
});

export {adapter, pool}
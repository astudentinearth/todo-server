import { NodePostgresAdapter } from "@lucia-auth/adapter-postgresql";
import pg from "pg";
import { PrismaClient } from "@prisma/client"
import * as redis from "redis";

const prismaClientSingleton = ()=>{
    return new PrismaClient();
}

const pool = new pg.Pool({
    user: process.env["POSTGRES_USER"],
    password: process.env["POSTGRES_PASSWORD"],
    database: process.env["POSTGRES_DB"],
    host: process.env["PG_HOST"],
    port: Number(process.env["PG_PORT"]) ?? 5432,
    min: 2,
});

pool.query("SET search_path TO public;");

const adapter = new NodePostgresAdapter(pool,{
    user: "users",
    session: "user_sessions"
});

declare global{
    // eslint-disable-next-line no-var
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

if(process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

const redisClient = redis.createClient({
    url: process.env["REDIS_URL"]
})

redisClient.connect().then(()=>{});

export {adapter, pool, prisma, redisClient}
import pg from "pg"
const {Pool} = pg;
import knex from "knex"

export const db = knex({
    client: "pg",
    connection:{
        user: process.env["PG_USERNAME"],
        host: process.env["PG_HOST"],
        port: process.env["PG_PORT"],
        database: "todoapp",
        password: process.env["PG_PASSWORD"],
    },
    pool: {min: 0, max: 16}
})

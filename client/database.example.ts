import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'
const client = new Client({
	connectionString: 'postgres://user:password@host:port/db',
})
// or
const client = new Client({
	host: '127.0.0.1',
	port: 5432,
	user: 'postgres',
	password: 'password',
	database: 'db_name',
})
await client.connect()
const db = drizzle(client)

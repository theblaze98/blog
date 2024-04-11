import { neon } from '@neondatabase/serverless'
import { Client } from 'pg'

export const neonDatabaseConnection = () => {
  const db = neon(process.env.NEON_DATABASE_URI)
  return db
}

export const localDatabaseConnection = async () => {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '1234',
    database: 'blog',
  })

  await client.connect()

  return client
}

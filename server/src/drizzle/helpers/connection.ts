import { neon } from '@neondatabase/serverless'

export const neonDatabaseConnection = () => {
  const db = neon(process.env.NEON_DATABASE_URI)
  return db
}

import { defineConfig } from 'drizzle-kit'
import { config } from 'dotenv'

config({ path: '.env.development' })

export default defineConfig({
  schema: [`src/drizzle/schemas/*.ts`],
  driver: 'pg',
  strict: true,
  verbose: true,
  dbCredentials: {
    connectionString: process.env.NEON_DATABASE_URI,
  },
  out: 'drizzle',
})

import { Module } from '@nestjs/common'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schemas'
import { neonDatabaseConnection } from './helpers'
import { DRIZZLE_PROVIDE } from '@/helpers'

@Module({
  providers: [
    {
      provide: DRIZZLE_PROVIDE,
      useFactory: async () => {
        try {
          const db = drizzle(neonDatabaseConnection(), { schema })
          return db
        } catch (error) {
          console.log(error)
        }
      },
    },
  ],
  exports: [DRIZZLE_PROVIDE],
})
export class DrizzleModule {}

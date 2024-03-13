import { Injectable, Inject } from '@nestjs/common'
import { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { eq, or } from 'drizzle-orm'
import { v4 as uuid } from 'uuid'
import { DRIZZLE_PROVIDE } from '@/helpers'
import * as schemas from '@/drizzle/schemas'
import { userTable } from '@/drizzle/schemas'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService {
  constructor(
    @Inject(DRIZZLE_PROVIDE) private db: NeonHttpDatabase<typeof schemas>,
  ) {}

  async create(newUser: CreateUserDto) {
    const id = uuid()
    const user = await this.db
      .insert(userTable)
      .values({ id, ...newUser })
      .returning()
    return user[0]
  }

  async findOne({ id, email }: { id?: string; email?: string }) {
    const user = await this.db.query.userTable.findMany({
      where: or(eq(userTable.id, id), eq(userTable.email, email)),
    })

    return user[0]
  }
}

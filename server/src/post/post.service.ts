import { DRIZZLE_PROVIDE } from '@/helpers'
import { Injectable, Inject } from '@nestjs/common'
import { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { v4 as uuid } from 'uuid'
import * as schema from '@/drizzle/schemas'
import { postTable } from '@/drizzle/schemas'
import { CreatePostDto } from '@/user/dto/create-user.dto'

@Injectable()
export class PostService {
  constructor(
    @Inject(DRIZZLE_PROVIDE) private db: NeonHttpDatabase<typeof schema>,
  ) {}

  async find() {
    return this.db.query.postTable.findMany({
      with: { author: { columns: { avatarUrl: true, username: true } } },
    })
  }

  async create(newPost: CreatePostDto) {
    const id = uuid()
    const post = await this.db
      .insert(postTable)
      .values({ id, ...newPost })
      .returning()

    return post[0]
  }
}

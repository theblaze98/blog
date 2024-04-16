import { Injectable, Inject } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { v4 as uuid } from 'uuid'
import { DRIZZLE_PROVIDE } from '@/helpers'
import * as schema from '@/drizzle/schemas'
import { postTable } from '@/drizzle/schemas'
import { CreatePostDto } from '@/post/dto/create-post.dto'

@Injectable()
export class PostService {
  constructor(
    @Inject(DRIZZLE_PROVIDE) private db: NeonHttpDatabase<typeof schema>,
  ) {}

  async find() {
    return await this.db.query.postTable.findMany({
      with: { author: { columns: { avatarUrl: true, username: true } } },
    })
  }

  async findById(id: string) {
    return await this.db.query.postTable.findFirst({
      where: eq(postTable.id, id),
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

import { Module } from '@nestjs/common'
import { PostController } from './post.controller'
import { PostService } from './post.service'
import { DrizzleModule } from '@/drizzle/drizzle.module'

@Module({
  imports: [DrizzleModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}

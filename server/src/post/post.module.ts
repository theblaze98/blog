import { Module } from '@nestjs/common'
import { PostController } from './post.controller'
import { PostService } from './post.service'
import { DrizzleModule } from '@/drizzle/drizzle.module'
import { CloudinaryModule } from '@/cloudinary/cloudinary.module'

@Module({
  imports: [DrizzleModule, CloudinaryModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}

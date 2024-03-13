import {
  Controller,
  Req,
  Post,
  Body,
  Get,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { PostService } from './post.service'
import { AuthGuard } from '@/common/guards'
import { RoleGuard } from '@/common/guards'
import { Roles } from '@/common/decorators/role.decorator'
import { ROLE } from '@/user/dto/create-user.dto'
import { CreatePostDto, createPostSchema } from './dto/create-post.dto'
import { ZodValidationPipe } from '@/common/pipes'

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  find() {
    return this.postService.find()
  }

  @Roles(ROLE.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Post('create')
  @UsePipes(new ZodValidationPipe(createPostSchema))
  create(@Req() request, @Body() newPost: CreatePostDto) {
    const { sub } = request.user

    return this.postService.create({ ...newPost, authorId: sub })
  }
}

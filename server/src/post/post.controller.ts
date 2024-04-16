import {
  Controller,
  Req,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseUUIDPipe,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { PostService } from './post.service'
import { AuthGuard } from '@/common/guards'
import { CreatePostDto, createPostSchema } from './dto/create-post.dto'
import { ZodValidationPipe } from '@/common/pipes'
import { CloudinaryService } from '@/cloudinary/cloudinary.service'

@Controller('posts')
export class PostController {
  constructor(
    private postService: PostService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  async find() {
    return await this.postService.find()
  }

  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.postService.findById(id)
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('create')
  async create(
    @Req() request,
    @Body(new ZodValidationPipe(createPostSchema)) newPost: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { sub } = request.user

    const { secure_url } = await this.cloudinaryService.uploadImage(file)

    return this.postService.create({
      ...newPost,
      authorId: sub,
      imageUrl: secure_url,
    })
  }
}

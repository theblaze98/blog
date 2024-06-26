import {
  Controller,
  Get,
  HttpException,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Req,
  Patch,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiResponse, ApiParam, ApiTags, ApiSecurity } from '@nestjs/swagger'
import { UserService } from './user.service'
import { httpErrorValidation } from '@/helpers/http-error-validation'
import { UserNotFound } from '@/auth/exeptions'
import { AuthGuard } from '@/common/guards'

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiSecurity('jwt')
  @ApiResponse({
    status: 200,
    description: 'The User find',
    schema: {
      properties: {
        id: { type: 'string', example: 'b5b3493b-6a94-4c07-9b7d-b7d3c5b245bb' },
        avatarUrl: {
          type: 'string',
          examples: ['https://blog.dev/imgprofile.png', 'null'],
        },
        username: { type: 'string', example: 'test' },
        email: { type: 'string', example: 'test@gmail.com' },
        role: { type: 'string', example: 'admin' },
        createdAt: { type: 'date', example: '2024-03-12T09:53:06.961Z' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'USER_NOT_FOUND',
    schema: {
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'USER_NOT_FOUND' },
      },
    },
  })
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  @UseGuards(AuthGuard)
  @Get('get_user_data')
  async findOne(
    /* @Param('id', new ParseUUIDPipe({ version: '4' })) id: string */ @Req()
    request,
  ) {
    try {
      const { sub } = request.user

      console.log(sub)

      const user = await this.userService.findOne({ id: sub })
      console.log(user)
      if (!user) throw new UserNotFound()

      delete user.password
      return user
    } catch (error) {
      const { message, statusCode } = httpErrorValidation(
        error.message,
        error.status,
      )
      throw new HttpException(message, statusCode)
    }
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Patch('upload_avatar')
  async updateAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Req() request,
  ) {
    try {
      const { user } = request

      const upload = await this.userService.avatarUpload(file, user.sub)

      delete upload.password
      return upload
    } catch (error) {
      return error
    }
  }
}

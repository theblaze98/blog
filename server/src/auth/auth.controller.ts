import {
  Controller,
  Post,
  Body,
  HttpException,
  UsePipes,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '@/user/user.service'
import { CreateUserDto, createUserSchema } from '@/user/dto/create-user.dto'
import {
  InvalidCredentials,
  UserAlreadyExists,
  UserNotFound,
} from './exeptions'
import { comparePassword, encryptPassword } from '@/helpers/password'
import { httpErrorValidation } from '@/helpers/http-error-validation'
import { ZodValidationPipe } from '@/common/pipes'
import { LoginDto, loginSchema } from './dto/login.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { CloudinaryService } from '@/cloudinary/cloudinary.service'

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('file'))
  async register(
    @Body(new ZodValidationPipe(createUserSchema)) newUser: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      if (await this.userService.findOne({ email: newUser.email }))
        throw new UserAlreadyExists()

      const hashedPassword = await encryptPassword(newUser.password)

      const { secure_url } = await this.cloudinaryService.uploadImage(file)

      const user = await this.userService.create({
        ...newUser,
        password: hashedPassword,
        avatarUrl: secure_url,
      })

      const token = await this.jwtService.signAsync({ sub: user.id })

      return { user, token }
    } catch (error) {
      const { message, statusCode } = httpErrorValidation(
        error.message,
        error.status,
      )
      throw new HttpException(message, statusCode)
    }
  }

  @Post('login')
  @UsePipes(new ZodValidationPipe(loginSchema))
  async login(@Body() { email, password }: LoginDto) {
    try {
      const user = await this.userService.findOne({ email })

      if (!user) throw new UserNotFound()

      const passwordCompare = await comparePassword(password, user.password)

      if (!passwordCompare) throw new InvalidCredentials()

      const token = await this.jwtService.signAsync({
        sub: user.id,
        role: user.role,
      })

      return { user, token }
    } catch (error) {
      const { message, statusCode } = httpErrorValidation(
        error.message,
        error.status,
      )
      throw new HttpException(message, statusCode)
    }
  }
}

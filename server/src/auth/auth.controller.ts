import { Controller, Post, Body, HttpException, UsePipes } from '@nestjs/common'
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

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async register(@Body() newUser: CreateUserDto) {
    try {
      if (await this.userService.findOne({ email: newUser.email }))
        throw new UserAlreadyExists()

      const hashedPassword = await encryptPassword(newUser.password)

      const user = await this.userService.create({
        ...newUser,
        password: hashedPassword,
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

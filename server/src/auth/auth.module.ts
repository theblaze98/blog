import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { UserModule } from '@/user/user.module'
import { UserService } from '@/user/user.service'
import { DrizzleModule } from '@/drizzle/drizzle.module'
import { CloudinaryModule } from '@/cloudinary/cloudinary.module'

@Module({
  imports: [UserModule, DrizzleModule, CloudinaryModule],
  controllers: [AuthController],
  providers: [UserService],
})
export class AuthModule {}

import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { DrizzleModule } from '@/drizzle/drizzle.module'
import { CloudinaryModule } from '@/cloudinary/cloudinary.module'

@Module({
  imports: [DrizzleModule, CloudinaryModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { DrizzleModule } from './drizzle/drizzle.module'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { CommonModule } from './common/common.module'
import { PostModule } from './post/post.module'
import { CloudinaryModule } from './cloudinary/cloudinary.module'
import { resolve } from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '90d' },
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve('src', 'uploads', 'avatars'),
      serveRoot: '/photos/avatars',
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve('src', 'uploads', 'posts'),
      serveRoot: '/photos/posts',
    }),
    DrizzleModule,
    UserModule,
    AuthModule,
    CommonModule,
    PostModule,
    CloudinaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

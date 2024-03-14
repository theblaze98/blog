import { Module } from '@nestjs/common'
import { v2 } from 'cloudinary'
import { CLOUDINARY_PROVIDER } from '@/helpers'
import { CloudinaryService } from './cloudinary.service'

@Module({
  providers: [
    {
      provide: CLOUDINARY_PROVIDER,
      useFactory() {
        return v2.config({
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        })
      },
    },
    CloudinaryService,
  ],
  exports: [CLOUDINARY_PROVIDER, CloudinaryService],
})
export class CloudinaryModule {}

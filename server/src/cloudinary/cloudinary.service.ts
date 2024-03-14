import { Injectable } from '@nestjs/common'
import { UploadApiResponse, UploadApiErrorResponse, v2 } from 'cloudinary'
import toStream from 'buffer-to-stream'

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        {
          unique_filename: true,
          overwrite: false,
          public_id: file.filename,
          upload_preset: 'blog_image',
        },
        (error, result) => {
          if (error) reject(error)
          resolve(result)
        },
      )
      toStream(file.buffer).pipe(upload)
    })
  }
}

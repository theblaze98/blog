import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST,', 'PUT', 'PATCH', 'DELETE'],
  })

  const config = new DocumentBuilder()
    .setTitle('Blog Api')
    .setDescription('The blog API')
    .setVersion('1.0')
    .addSecurity('jwt', {
      type: 'http',
      scheme: 'bearer',
    })
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('doc', app, document)

  await app.listen(Number(process.env.PORT) || 4000)
  console.log(`Server running in ${await app.getUrl()}`)
}
bootstrap()

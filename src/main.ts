import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  const config = new DocumentBuilder()
  .setTitle('API Delivery')
  .setDescription('API para gerenciamento de produtos, categorias e usuarios')
  .setVersion('1.0')
  .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);
  
    process.env.TZ = '-03:00';
    app.useGlobalPipes(new ValidationPipe());

    app.enableCors();
  await app.listen(process.env.PORT ?? 4000);
}
void bootstrap();


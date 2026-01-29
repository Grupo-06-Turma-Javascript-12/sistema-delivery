import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Mastiga - Delivery Saudável API')
    .setDescription(
      'Mastiga - Delivery Saúdavel API - Projeto Integrador Generation Brasil',
    )
    .setContact(
      'Mastiga - Delivery Saúdavel',
      'https://github.com/Grupo-06-Turma-Javascript-12/sistema-delivery',
      'grupo06turmajavascript12@gmail.com',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  process.env.TZ = '-03:00';
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();
  await app.listen(process.env.PORT ?? 4000);
}
void bootstrap();

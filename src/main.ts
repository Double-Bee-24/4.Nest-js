import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuratin Swagger
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation for my project')
    .setVersion('1.0')
    .addTag('users') // Additional tag for a route
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Creating Swagger UI
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true, // Generates a mistake if unnecessary properties passed
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

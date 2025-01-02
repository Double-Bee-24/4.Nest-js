// try {
//   throw new Error('Error here');
// } catch (e) {
//   console.log(e.stack);
// }

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurating Swagger
  const config = new DocumentBuilder()
    .setTitle('Starwars universe API')
    .setDescription('API documentation for Starwars universe project')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Creating Swagger UI
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true, // Generates a mistake if unnecessary properties passed
    }),
  );

  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

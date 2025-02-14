import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // Set global prefix
  app.setGlobalPrefix('api');

  // Configuring Swagger
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
      forbidNonWhitelisted: true, // Throws an error if unnecessary properties are passed
    }),
  );

  app.enableCors({
    origin: `http://localhost:${process.env.CLIENT_PORT ?? 3000}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 4000);
}

bootstrap().catch((error: unknown) => {
  console.error('Error during bootstrap:', error);
});

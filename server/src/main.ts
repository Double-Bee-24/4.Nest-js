import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { createSwaggerConfig } from './config/swagger.config';
import { createCorsConfig } from './config/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // Set global prefix
  app.setGlobalPrefix('api');

  // Configuring Swagger
  const swaggerConfig = createSwaggerConfig();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true, // Throws an error if unnecessary properties are passed
    }),
  );

  app.enableCors(createCorsConfig());

  await app.listen(process.env.PORT ?? 4000);
}

bootstrap().catch((error: unknown) => {
  console.error('Error during bootstrap:', error);
});

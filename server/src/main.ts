import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { DataSource } from 'typeorm';
import { Sessions } from './utils/typeorm-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const dataSource = app.get(DataSource);
  const sessionRepository = dataSource.getRepository(Sessions);

  // Set global prefix
  app.setGlobalPrefix('api');

  // Configuring Swagger
  const config = new DocumentBuilder()
    .setTitle('Starwars universe API')
    .setDescription('API documentation for Starwars universe project')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.use(
    session({
      name: 'NESTJS_SESSION_ID',
      secret: process.env.SESSION_SECRET || 'default_secret',
      resave: false, // Do not save session if it hasn't been modified
      saveUninitialized: false, // Do not save new sessions if they are not initialized
      cookie: {
        maxAge: 6000000, // In miliseconds
        httpOnly: true, // Prevents access to the cookie from client-side JS
        secure: false, // Set to true if you are using HTTPS
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

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

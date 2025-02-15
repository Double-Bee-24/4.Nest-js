import { DocumentBuilder } from '@nestjs/swagger';

export function createSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('Starwars universe API')
    .setDescription('API documentation for Starwars universe project')
    .setVersion('1.0')
    .build();
}

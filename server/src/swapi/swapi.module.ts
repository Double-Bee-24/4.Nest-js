import { Module } from '@nestjs/common';
import { SwapiController } from './swapi.controller';
import { SwapiService } from './swapi.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { People } from 'src/people/entities/people.entity';
import { Planets } from 'src/planets/entities/planets.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starships } from 'src/starships/entities/starships.entity';
import { Vehicles } from 'src/vehicles/entities/vehicles.entity';
import { Films } from 'src/films/entities/films.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      People,
      Planets,
      Species,
      Starships,
      Vehicles,
      Films,
    ]),
    HttpModule,
  ],
  controllers: [SwapiController],
  providers: [SwapiService],
})
export class SwapiModule {}

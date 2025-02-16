import { Module } from '@nestjs/common';
import { SwapiController } from './swapi.controller';
import { SwapiService } from './swapi.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Person } from 'src/modules/people/entities/people.entity';
import { Planet } from 'src/modules/planets/entities/planets.entity';
import { Species } from 'src/modules/species/entities/species.entity';
import { Starship } from 'src/modules/starships/entities/starships.entity';
import { Vehicle } from 'src/modules/vehicles/entities/vehicles.entity';
import { Film } from 'src/modules/films/entities/films.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Person,
      Planet,
      Species,
      Starship,
      Vehicle,
      Film,
    ]),
    HttpModule,
  ],
  controllers: [SwapiController],
  providers: [SwapiService],
})
export class SwapiModule {}

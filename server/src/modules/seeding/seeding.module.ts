import { Module } from '@nestjs/common';
import { SeedingService } from './seeding.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/database/entities/people.entity';
import { Planet } from 'src/database/entities/planets.entity';
import { Species } from 'src/database/entities/species.entity';
import { Starship } from 'src/database/entities/starships.entity';
import { Vehicle } from 'src/database/entities/vehicles.entity';
import { Film } from 'src/database/entities/films.entity';
import { SeedingController } from './seeding.controller';

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
  ],
  providers: [SeedingService],
  controllers: [SeedingController],
})
export class SeedingModule {}

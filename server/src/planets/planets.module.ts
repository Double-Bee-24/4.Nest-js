import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planets } from './entities/planets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Planets])],
  providers: [PlanetsService],
  controllers: [PlanetsController],
})
export class PlanetsModule {}

import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planet } from './entities/planets.entity';
import { MulterModule } from '@nestjs/platform-express';
import { getMulterConfig } from 'src/utils/multer-config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Planet]),
    MulterModule.register(getMulterConfig()),
  ],
  providers: [PlanetsService],
  controllers: [PlanetsController],
})
export class PlanetsModule {}

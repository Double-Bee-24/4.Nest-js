import { Module } from '@nestjs/common';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Species } from './entities/species.entity';
import { MulterModule } from '@nestjs/platform-express';
import { getMulterConfig } from 'src/utils/multer-config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Species]),
    MulterModule.register(getMulterConfig()),
  ],
  controllers: [SpeciesController],
  providers: [SpeciesService],
})
export class SpeciesModule {}

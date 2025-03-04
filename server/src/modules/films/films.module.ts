import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../../database/entities/films.entity';
import { MulterModule } from '@nestjs/platform-express';
import { getMulterConfig } from 'src/config/multer-config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Film]),
    MulterModule.register(getMulterConfig()),
  ],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}

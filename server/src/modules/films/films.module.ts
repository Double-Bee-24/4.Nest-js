import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Films } from './entities/films.entity';
import { MulterModule } from '@nestjs/platform-express';
import { getMulterConfig } from 'src/utils/multer-config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Films]),
    MulterModule.register(getMulterConfig()),
  ],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}

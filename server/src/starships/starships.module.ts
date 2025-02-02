import { Module } from '@nestjs/common';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starships } from './entities/starships.entity';
import { MulterModule } from '@nestjs/platform-express';
import { getMulterConfig } from 'src/utils/multer-config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Starships]),
    MulterModule.register(getMulterConfig()),
  ],
  controllers: [StarshipsController],
  providers: [StarshipsService],
})
export class StarshipsModule {}

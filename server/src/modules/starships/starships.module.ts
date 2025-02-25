import { Module } from '@nestjs/common';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starship } from './entities/starships.entity';
import { MulterModule } from '@nestjs/platform-express';
import { getMulterConfig } from 'src/config/multer-config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Starship]),
    MulterModule.register(getMulterConfig()),
  ],
  controllers: [StarshipsController],
  providers: [StarshipsService],
})
export class StarshipsModule {}

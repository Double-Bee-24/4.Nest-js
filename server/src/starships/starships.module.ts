import { Module } from '@nestjs/common';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starships } from './entities/starships.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Starships])],
  controllers: [StarshipsController],
  providers: [StarshipsService],
})
export class StarshipsModule {}

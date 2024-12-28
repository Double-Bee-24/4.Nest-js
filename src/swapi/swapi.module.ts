import { Module } from '@nestjs/common';
import { SwapiController } from './swapi.controller';
import { SwapiService } from './swapi.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from 'src/people/entities/people.entity';
import { PeopleModule } from 'src/people/people.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([People]), PeopleModule, HttpModule],
  controllers: [SwapiController],
  providers: [SwapiService],
})
export class SwapiModule {}

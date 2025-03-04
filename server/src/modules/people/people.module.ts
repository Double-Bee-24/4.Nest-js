import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from '../../database/entities/people.entity';
import { MulterModule } from '@nestjs/platform-express';
import { getMulterConfig } from 'src/config/multer-config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person]),
    MulterModule.register(getMulterConfig()),
  ],
  controllers: [PeopleController],
  providers: [PeopleService],
})
export class PeopleModule {}

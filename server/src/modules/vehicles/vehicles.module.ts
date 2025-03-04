import { Module } from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from '../../database/entities/vehicles.entity';
import { MulterModule } from '@nestjs/platform-express';
import { getMulterConfig } from 'src/config/multer-config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicle]),
    MulterModule.register(getMulterConfig()),
  ],
  controllers: [VehiclesController],
  providers: [VehiclesService],
})
export class VehiclesModule {}

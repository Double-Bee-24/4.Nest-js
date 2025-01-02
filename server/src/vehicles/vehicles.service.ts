import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Vehicles } from './entities/vehicles.entity';
import { VehiclesDto } from './dto/vehicles.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicles)
    private vehiclesRepository: Repository<Vehicles>,
  ) {}

  getVehicles(): Promise<Vehicles[]> {
    return this.vehiclesRepository.find();
  }

  createVehicle(vehiclesDto: VehiclesDto): Promise<Vehicles> {
    const newVehicle = this.vehiclesRepository.create(vehiclesDto);
    return this.vehiclesRepository.save(newVehicle);
  }

  updateVehicle(id: number, vehiclesDto: VehiclesDto): Promise<UpdateResult> {
    return this.vehiclesRepository.update(id, vehiclesDto);
  }

  deleteVehicle(id: number): Promise<DeleteResult> {
    return this.vehiclesRepository.delete(id);
  }
}

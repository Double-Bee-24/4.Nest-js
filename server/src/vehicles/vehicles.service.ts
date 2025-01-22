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

  getAllVehicles(): Promise<Vehicles[]> {
    return this.vehiclesRepository.find();
  }

  async getVehicle(id: number): Promise<Vehicles> {
    const vehicle = await this.vehiclesRepository.findOneBy({ id });

    if (!vehicle) {
      throw new Error('vehicle with such id not found');
    }

    return vehicle;
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

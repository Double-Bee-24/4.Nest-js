import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Vehicles } from './entities/vehicles.entity';
import { VehiclesDto } from './dto/vehicles.dto';
import { sendImage } from 'src/utils/img-utils';
import { Response } from 'express';

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

  // Writes path to avatar to database
  async uploadImage(id: number, file: Express.Multer.File): Promise<Vehicles> {
    const filePath = `./images/${file.filename}`;

    const vehicle = await this.vehiclesRepository.findOneBy({ id });

    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    vehicle.avatar = filePath;

    return this.vehiclesRepository.save(vehicle);
  }

  async getImage(id: number, res: Response): Promise<void> {
    const vehicle = await this.vehiclesRepository.findOneBy({ id });

    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    let filename = vehicle.avatar;

    if (!filename) {
      // Set default avatar
      filename = './images/profile.png';
    }

    const filePath = filename;

    // Sets headers to an image and sends it to client
    await sendImage(filePath, filename, res);
  }
}

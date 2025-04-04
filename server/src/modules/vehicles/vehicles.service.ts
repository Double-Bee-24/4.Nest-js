import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Vehicle } from '../../database/entities/vehicles.entity';
import { CreateVehiclesDto } from './dto/create-vehicles.dto';
import { sendImage } from 'src/utils/img-utils';
import { Response } from 'express';
import { UpdateVehiclesDto } from './dto/update-vehicles.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehiclesRepository: Repository<Vehicle>,
  ) {}

  async getAllVehicles(page: number, limit: number) {
    const [result, total] = await this.vehiclesRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      select: [
        'model',
        'vehicleClass',
        'manufacturer',
        'costInCredits',
        'length',
        'crew',
        'passengers',
        'maxAtmospheringSpeed',
        'cargoCapacity',
        'consumables',
        'name',
        'description',
        'avatar',
        'id',
      ],
    });

    return {
      entityData: result,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getVehicle(id: number): Promise<Vehicle> {
    const vehicle = await this.vehiclesRepository.findOneBy({ id });

    if (!vehicle) {
      throw new Error('vehicle with such id not found');
    }

    return vehicle;
  }

  createVehicle(vehiclesDto: CreateVehiclesDto): Promise<Vehicle> {
    const newVehicle = this.vehiclesRepository.create(vehiclesDto);
    return this.vehiclesRepository.save(newVehicle);
  }

  async updateVehicle(
    id: number,
    vehiclesDto: UpdateVehiclesDto,
  ): Promise<UpdateResult> {
    const vehicle = await this.vehiclesRepository.findOneBy({ id });
    return this.vehiclesRepository.update(id, { ...vehicle, ...vehiclesDto });
  }

  deleteVehicle(id: number): Promise<DeleteResult> {
    return this.vehiclesRepository.delete(id);
  }

  // Writes path to avatar to database
  async uploadImage(id: number, file: Express.Multer.File): Promise<Vehicle> {
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

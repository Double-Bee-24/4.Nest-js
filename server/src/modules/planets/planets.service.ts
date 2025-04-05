import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Planet } from '../../database/entities/planets.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreatePlanetsDto as CreatePlanetsDto } from './dto/create-planets.dto';
import { sendImage } from 'src/utils/img-utils';
import { Response } from 'express';
import { UpdatePlanetsDto } from './dto/update-planets.dto';
import { join } from 'path';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(Planet)
    private planetsRepository: Repository<Planet>,
  ) {}

  async getAllPlanets(page: number, limit: number) {
    const [result, total] = await this.planetsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      select: [
        'description',
        'diameter',
        'rotationPeriod',
        'orbitalPeriod',
        'gravity',
        'population',
        'climate',
        'terrain',
        'surfaceWater',
        'name',
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

  async getPlanet(id: number): Promise<Planet> {
    const planet = await this.planetsRepository.findOneBy({ id });

    if (!planet) {
      throw new NotFoundException('Planet with such id not found');
    }

    return planet;
  }

  createPlanet(planetsDto: CreatePlanetsDto): Promise<Planet> {
    const newPlanet = this.planetsRepository.create(planetsDto);

    return this.planetsRepository.save(newPlanet);
  }

  async updatePlanet(
    id: number,
    planetsDto: UpdatePlanetsDto,
  ): Promise<UpdateResult> {
    const planet = await this.planetsRepository.findOneBy({ id });
    return this.planetsRepository.update(id, { ...planet, ...planetsDto });
  }

  deletePlanet(id: number): Promise<DeleteResult> {
    return this.planetsRepository.delete(id);
  }

  // Writes path to avatar to database
  async uploadImage(id: number, file: Express.Multer.File): Promise<Planet> {
    const filePath = `./images/${file.filename}`;

    const planet = await this.planetsRepository.findOneBy({ id });

    if (!planet) {
      throw new NotFoundException('Planet with such id not found');
    }

    planet.avatar = filePath;

    return this.planetsRepository.save(planet);
  }

  async getImage(id: number, res: Response): Promise<void> {
    const planet = await this.planetsRepository.findOneBy({ id });

    if (!planet) {
      throw new NotFoundException('Planet with such id not found');
    }

    let filename = planet.avatar;

    if (!filename) {
      // Set default avatar
      filename = 'images/profile.png';
    }

    const filePath = join(process.cwd(), filename);

    // Sets headers to an image and sends it to client
    await sendImage(filePath, filename, res);
  }
}

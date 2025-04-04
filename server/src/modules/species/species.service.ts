import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Species } from '../../database/entities/species.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { sendImage } from 'src/utils/img-utils';
import { Response } from 'express';
import { UpdateSpeciesDto } from './dto/update-species.dto';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Species)
    private speciesRepository: Repository<Species>,
  ) {}

  async getAllSpecies(page: number, limit: number) {
    const [result, total] = await this.speciesRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      select: [
        'description',
        'classification',
        'designation',
        'averageHeight',
        'averageLifespan',
        'hairColors',
        'skinColors',
        'eyeColors',
        'language',
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

  async getSpecies(id: number): Promise<Species> {
    const species = await this.speciesRepository.findOneBy({ id });

    if (!species) {
      throw new Error('species with such id not found');
    }

    return species;
  }

  createSpecies(speciesDto: CreateSpeciesDto): Promise<Species> {
    const newSpecies = this.speciesRepository.create(speciesDto);
    return this.speciesRepository.save(newSpecies);
  }

  async updateSpeceis(
    id: number,
    speciesDto: UpdateSpeciesDto,
  ): Promise<UpdateResult> {
    const species = await this.speciesRepository.findOneBy({ id });
    return this.speciesRepository.update(id, { ...species, ...speciesDto });
  }

  deleteSpecies(id: number): Promise<DeleteResult> {
    return this.speciesRepository.delete(id);
  }

  // Writes path to avatar to database
  async uploadImage(id: number, file: Express.Multer.File): Promise<Species> {
    const filePath = `./images/${file.filename}`;

    const species = await this.speciesRepository.findOneBy({ id });

    if (!species) {
      throw new Error('Species not found');
    }

    species.avatar = filePath;

    return this.speciesRepository.save(species);
  }

  async getImage(id: number, res: Response): Promise<void> {
    const species = await this.speciesRepository.findOneBy({ id });

    if (!species) {
      throw new Error('Species not found');
    }

    let filename = species.avatar;

    if (!filename) {
      // Set default avatar
      filename = './images/profile.png';
    }

    const filePath = filename;

    // Sets headers to an image and sends it to client
    await sendImage(filePath, filename, res);
  }
}

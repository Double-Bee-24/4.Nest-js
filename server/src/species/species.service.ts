import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Species } from './entities/species.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SpeciesDto } from './dto/species.dto';
import { sendImage } from 'src/utils/img-utils';
import { Response } from 'express';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Species)
    private speciesRepository: Repository<Species>,
  ) {}

  getAllSpecies(): Promise<Species[]> {
    return this.speciesRepository.find();
  }

  async getSpecies(id: number): Promise<Species> {
    const species = await this.speciesRepository.findOneBy({ id });

    if (!species) {
      throw new Error('species with such id not found');
    }

    return species;
  }

  createSpecies(speciesDto: SpeciesDto): Promise<Species> {
    const newSpecies = this.speciesRepository.create(speciesDto);
    return this.speciesRepository.save(newSpecies);
  }

  updateSpeceis(id: number, speciesDto: SpeciesDto): Promise<UpdateResult> {
    return this.speciesRepository.update(id, speciesDto);
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

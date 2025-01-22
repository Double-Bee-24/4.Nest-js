import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Species } from './entities/species.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SpeciesDto } from './dto/species.dto';

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
}

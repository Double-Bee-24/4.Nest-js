import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Planets } from './entities/planets.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PlanetsDto as PlanetsDto } from './dto/planets.dto';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(Planets)
    private planetsRepository: Repository<Planets>,
  ) {}

  getAllPlanets(): Promise<Planets[]> {
    return this.planetsRepository.find();
  }

  async getPlanet(id: number): Promise<Planets> {
    const planet = await this.planetsRepository.findOneBy({ id });

    if (!planet) {
      throw new Error('planet with such id not found');
    }

    return planet;
  }

  createPlanet(planetsDto: PlanetsDto): Promise<Planets> {
    const newPlanet = this.planetsRepository.create(planetsDto);
    return this.planetsRepository.save(newPlanet);
  }

  updatePlanet(id: number, planetsDto: PlanetsDto): Promise<UpdateResult> {
    return this.planetsRepository.update(id, planetsDto);
  }

  deletePlanet(id: number): Promise<DeleteResult> {
    return this.planetsRepository.delete(id);
  }
}

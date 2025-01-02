import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Starships } from './entities/starships.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { StarshipsDto } from './dto/starships.dto';

@Injectable()
export class StarshipsService {
  constructor(
    @InjectRepository(Starships)
    private starshipsRepository: Repository<Starships>,
  ) {}

  getStarships(): Promise<Starships[]> {
    return this.starshipsRepository.find();
  }

  createStarship(starshipsDto: StarshipsDto): Promise<Starships> {
    const newStarship = this.starshipsRepository.create(starshipsDto);
    return this.starshipsRepository.save(newStarship);
  }

  updateStarship(
    id: number,
    starshipsDto: StarshipsDto,
  ): Promise<UpdateResult> {
    return this.starshipsRepository.update(id, starshipsDto);
  }

  deleteStarship(id: number): Promise<DeleteResult> {
    return this.starshipsRepository.delete(id);
  }
}

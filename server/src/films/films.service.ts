import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Films } from './entities/films.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmsDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Films)
    private readonly filmsRepository: Repository<Films>,
  ) {}

  getAllFilms(): Promise<Films[]> {
    return this.filmsRepository.find();
  }

  createFilm(filmsDto: FilmsDto): Promise<Films> {
    const newFilm = this.filmsRepository.create(filmsDto);
    return this.filmsRepository.save(newFilm);
  }

  updateFilm(id: number, filmsDto: FilmsDto): Promise<UpdateResult> {
    return this.filmsRepository.update(id, filmsDto);
  }

  deleteFilm(id: number): Promise<DeleteResult> {
    return this.filmsRepository.delete(id);
  }
}

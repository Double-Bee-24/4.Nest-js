import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Films } from './entities/films.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmsDto } from './dto/films.dto';
import { sendImage } from 'src/utils/img-utils';
import { Response } from 'express';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Films)
    private readonly filmsRepository: Repository<Films>,
  ) {}

  async getAllFilms(): Promise<Films[]> {
    const films = await this.filmsRepository.find();
    // return this.filmsRepository.find({
    //   relations: ['planets', 'characters', 'vehicles', 'starships', 'species'],
    // });
    // return plainToInstance(Films, films, { excludeExtraneousValues: true });
    return films;
  }

  async getFilm(id: number): Promise<Films> {
    const film = await this.filmsRepository.findOneBy({ id });

    if (!film) {
      throw new Error('film with such id not found');
    }

    return film;
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

  // Writes path to avatar to database
  async uploadImage(id: number, file: Express.Multer.File): Promise<Films> {
    const filePath = `./images/${file.filename}`;

    const film = await this.filmsRepository.findOneBy({ id });

    if (!film) {
      throw new Error('Film not found');
    }

    film.avatar = filePath;

    return this.filmsRepository.save(film);
  }

  async getImage(id: number, res: Response): Promise<void> {
    const film = await this.filmsRepository.findOneBy({ id });

    if (!film) {
      throw new Error('Film not found');
    }

    let filename = film.avatar;

    if (!filename) {
      // Set default avatar
      filename = './images/profile.png';
    }

    const filePath = filename;

    // Sets headers to an image and sends it to client
    await sendImage(filePath, filename, res);
  }
}

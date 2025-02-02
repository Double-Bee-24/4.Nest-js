import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Starships } from './entities/starships.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { StarshipsDto } from './dto/starships.dto';
import { sendImage } from 'src/utils/img-utils';
import { Response } from 'express';

@Injectable()
export class StarshipsService {
  constructor(
    @InjectRepository(Starships)
    private starshipsRepository: Repository<Starships>,
  ) {}

  getAllStarships(): Promise<Starships[]> {
    return this.starshipsRepository.find();
  }

  async getStarship(id: number): Promise<Starships> {
    const starship = await this.starshipsRepository.findOneBy({ id });

    if (!starship) {
      throw new Error('starship with such id not found');
    }

    return starship;
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

  // Writes path to avatar to database
  async uploadImage(id: number, file: Express.Multer.File): Promise<Starships> {
    const filePath = `./images/${file.filename}`;

    const starship = await this.starshipsRepository.findOneBy({ id });

    if (!starship) {
      throw new Error('Starship not found');
    }

    starship.avatar = filePath;

    return this.starshipsRepository.save(starship);
  }

  async getImage(id: number, res: Response): Promise<void> {
    const starship = await this.starshipsRepository.findOneBy({ id });

    if (!starship) {
      throw new Error('Starship not found');
    }

    let filename = starship.avatar;

    if (!filename) {
      // Set default avatar
      filename = './images/profile.png';
    }

    const filePath = filename;

    // Sets headers to an image and sends it to client
    await sendImage(filePath, filename, res);
  }
}

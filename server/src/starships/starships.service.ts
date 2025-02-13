import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Starships } from './entities/starships.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStarshipsDto } from './dto/create-starships.dto';
import { sendImage } from 'src/utils/img-utils';
import { Response } from 'express';
import { UpdateStarshipsDto } from './dto/update-starships.dto';

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

  createStarship(starshipsDto: CreateStarshipsDto) {
    const newStarship = this.starshipsRepository.create(starshipsDto);

    return this.starshipsRepository.save(newStarship);
  }

  async updateStarship(
    id: number,
    starshipsDto: UpdateStarshipsDto,
  ): Promise<UpdateResult> {
    const starship = await this.starshipsRepository.findOneBy({ id });
    return this.starshipsRepository.update(id, {
      ...starship,
      ...starshipsDto,
    });
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

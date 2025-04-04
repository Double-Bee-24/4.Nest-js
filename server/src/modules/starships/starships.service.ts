import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Starship } from '../../database/entities/starships.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStarshipsDto } from './dto/create-starships.dto';
import { sendImage } from 'src/utils/img-utils';
import { Response } from 'express';
import { UpdateStarshipsDto } from './dto/update-starships.dto';

@Injectable()
export class StarshipsService {
  constructor(
    @InjectRepository(Starship)
    private starshipsRepository: Repository<Starship>,
  ) {}

  async getAllStarships(page: number, limit: number) {
    const [result, total] = await this.starshipsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      select: [
        'model',
        'starshipClass',
        'manufacturer',
        'costInCredits',
        'length',
        'crew',
        'passengers',
        'maxAtmospheringSpeed',
        'hyperdriveRating',
        'MGLT',
        'cargoCapacity',
        'consumables',
        'name',
        'description',
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

  async getStarship(id: number): Promise<Starship> {
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
  async uploadImage(id: number, file: Express.Multer.File): Promise<Starship> {
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

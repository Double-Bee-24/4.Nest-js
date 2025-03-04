import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from '../../database/entities/people.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Response } from 'express';
import { sendImage } from 'src/utils/img-utils';
import { CreatePeopleDto } from './dto/create-people.dto';
import { UpdatePeopleDto } from './dto/update-people.dto';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private peopleRepository: Repository<Person>,
  ) {}

  async getPeople(page: number, limit: number) {
    const [result, total] = await this.peopleRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      select: [
        'description',
        'mass',
        'hairColor',
        'skinColor',
        'eyeColor',
        'birthYear',
        'gender',
        'name',
        'avatar',
        'id',
        'height',
      ],
    });

    return {
      data: result,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getPerson(id: number): Promise<Person> {
    const person = await this.peopleRepository.findOneBy({ id });
    if (!person) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return person;
  }

  createPerson(peopleDto: CreatePeopleDto): Promise<Person> {
    const newPerson = this.peopleRepository.create(peopleDto);
    return this.peopleRepository.save(newPerson);
  }

  async updatePerson(
    id: number,
    peopleDto: UpdatePeopleDto,
  ): Promise<UpdateResult> {
    const person = await this.peopleRepository.findOneBy({ id });

    return this.peopleRepository.update(id, { ...person, ...peopleDto });
  }

  deletePerson(id: number): Promise<DeleteResult> {
    return this.peopleRepository.delete(id);
  }

  // Writes path to avatar to database
  async uploadImage(id: number, file: Express.Multer.File): Promise<Person> {
    const filePath = `./images/${file.filename}`;

    const person = await this.peopleRepository.findOneBy({ id });

    if (!person) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    person.avatar = filePath;

    return this.peopleRepository.save(person);
  }

  async getImage(id: number, res: Response): Promise<void> {
    const person = await this.peopleRepository.findOneBy({ id });

    if (!person) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    let filename = person.avatar;

    if (!filename) {
      // Set default avatar
      filename = './images/profile.png';
    }

    const filePath = filename;

    // Sets headers to an image and sends it to client
    await sendImage(filePath, filename, res);
  }
}

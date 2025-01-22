import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { People } from './entities/people.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PeopleDto } from './dto/people.dto';
import { Response } from 'express';
import { sendImage } from 'src/utils/img-utils';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(People)
    private peopleRepository: Repository<People>,
  ) {}

  getPeople(): Promise<People[]> {
    return this.peopleRepository.find();
  }

  async getPerson(id: number): Promise<People> {
    const person = await this.peopleRepository.findOneBy({ id });
    if (!person) {
      throw new Error('Person not found');
    }
    return person;
  }

  createPerson(peopleDto: PeopleDto): Promise<People> {
    const newPerson = this.peopleRepository.create(peopleDto);
    return this.peopleRepository.save(newPerson);
  }

  updatePerson(id: number, updateDate: PeopleDto): Promise<UpdateResult> {
    return this.peopleRepository.update(id, updateDate);
  }

  deletePerson(id: number): Promise<DeleteResult> {
    return this.peopleRepository.delete(id);
  }

  async uploadImage(id: number, file: Express.Multer.File): Promise<People> {
    const filePath = `./images/${file.filename}`;

    const person = await this.peopleRepository.findOneBy({ id });

    if (!person) {
      throw new Error('Person not found');
    }

    person.avatar = filePath;

    return this.peopleRepository.save(person);
  }

  async getImage(id: number, res: Response): Promise<void> {
    const person = await this.peopleRepository.findOneBy({ id });

    if (!person) {
      throw new Error('Person not found');
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

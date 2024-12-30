import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { People } from './entities/people.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PeopleDto } from './dto/people.dto';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(People)
    private peopleRepository: Repository<People>,
  ) {}

  // Fetches all the rows from People table
  async getData(): Promise<People[]> {
    return this.peopleRepository.find();
  }

  async createPerson(peopleDto: PeopleDto): Promise<People> {
    const newPerson = this.peopleRepository.create(peopleDto);
    return this.peopleRepository.save(newPerson);
  }

  async updatePerson(
    _id: string,
    updateDate: Partial<PeopleDto>,
  ): Promise<UpdateResult> {
    return this.peopleRepository.update(_id, updateDate);
  }

  async remove(_id: string): Promise<DeleteResult> {
    return await this.peopleRepository.delete(_id);
  }
}

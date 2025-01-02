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
  getPeople(): Promise<People[]> {
    return this.peopleRepository.find();
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
}

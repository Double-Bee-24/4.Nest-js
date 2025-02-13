import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findOneByUsername(username: string): Promise<Users> {
    const user = await this.usersRepository.findOneBy({ username });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOneById(id: number): Promise<Users> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(username: string, password: string) {
    const newUser = this.usersRepository.create({ username, password });

    return this.usersRepository.save(newUser);
  }
}

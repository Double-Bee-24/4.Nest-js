import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ username });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOneById(id: number): Promise<User> {
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

import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../database/entities/users.entity';
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
    let newUser = { username, password, role: 'user' };

    if (username.includes('admin')) {
      newUser = { ...newUser, role: 'admin' };
    }

    const createdUser = this.usersRepository.create(newUser);

    return this.usersRepository.save(createdUser);
  }
}

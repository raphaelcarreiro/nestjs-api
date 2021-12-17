import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async show(id: number) {
    console.log(id);
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async store(payload: CreateUserDto) {
    const user = this.userRepository.create(payload);

    await this.userRepository.save(user);

    return user;
  }
}

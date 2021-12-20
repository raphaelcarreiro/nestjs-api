import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

import { User } from './user.entity';
import { IUsersService } from './users.service.interface';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async show(id: number) {
    return await this.findOne(+id);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async store(payload: CreateUserDto) {
    const user = this.userRepository.create(payload);

    await this.userRepository.save(user);

    return user;
  }

  async update(id: number, userDto: CreateUserDto) {
    await this.findOne(+id);

    await this.userRepository.update(id, userDto);

    return await this.userRepository.findOne(+id);
  }

  async destroy(id: number) {
    await this.findOne(+id);
    await this.userRepository.delete(id);
  }
}

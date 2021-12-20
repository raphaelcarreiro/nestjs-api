import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

export interface IUsersService {
  findAll(): Promise<User[]>;
  show(id: number): Promise<User>;
  findOne(id: number): Promise<User>;
  store(userDto: CreateUserDto): Promise<User>;
  update(id: number, userDto: CreateUserDto): Promise<User>;
  destroy(id: number): void;
}

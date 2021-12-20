import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  index() {
    return this.usersService.findAll();
  }

  @Get(':id')
  show(
    @Param('id')
    id: number,
  ) {
    return this.usersService.show(id);
  }

  @Post()
  create(
    @Body()
    createOrderDto: CreateUserDto,
  ) {
    return this.usersService.store(createOrderDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateUserDto: CreateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
}

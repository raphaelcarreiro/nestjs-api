import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IUsersService } from './users.service.interface';

@Controller('/users')
export class UsersController {
  constructor(
    @Inject('IUsersService')
    private readonly usersService: IUsersService,
  ) {}

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

  @Delete(':id')
  @HttpCode(204)
  async destroy(@Param('id') id: number) {
    await this.usersService.destroy(+id);
  }
}

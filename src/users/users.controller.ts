import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { UserResponse } from 'src/api-doc/user.response';
import { CreateUserDto } from './dto/create-user.dto';
import { IUsersService } from './users.service.interface';

@UseInterceptors(ClassSerializerInterceptor)
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

  @ApiOkResponse({
    type: UserResponse,
  })
  @Get(':id')
  show(
    @Param('id')
    id: number,
  ) {
    return this.usersService.show(id);
  }

  @ApiCreatedResponse({
    type: UserResponse,
  })
  @Post()
  create(
    @Body(new ValidationPipe({ errorHttpStatusCode: 422 }))
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

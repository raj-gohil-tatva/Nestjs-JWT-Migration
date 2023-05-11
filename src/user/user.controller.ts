import { Body, Get, Param, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { RegisterUserDTO } from './DTO/user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // To register the new user to the system.
  @Post('/register')
  register(@Body() body: RegisterUserDTO) {
    return this.userService.register(body);
  }

  // Find the user given by the ID.
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.userService.findUserById(id);
  }
}

import { Body, Get, Param, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { LoginUserDTO, RegisterUserDTO } from './DTO/user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // To register the new user to the system.
  @Post('/register')
  register(@Body() body: RegisterUserDTO) {
    return this.userService.register(body);
  }

  // Login the user to the System.
  @Post('login')
  login(@Body() loginData: LoginUserDTO) {
    return this.userService.login(loginData.Email, loginData.Password);
  }

  // Find the user given by the ID.
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.userService.findUserById(id);
  }
}

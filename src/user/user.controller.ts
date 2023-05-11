import { Body, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { RegisterUserDTO } from './DTO/user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // To register the new user to the system.
  @Post('/register')
  Register(@Body() body: RegisterUserDTO) {
    return this.userService.register(body);
  }
}

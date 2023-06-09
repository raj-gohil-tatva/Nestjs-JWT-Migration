import { Body, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { EditUserDTO, LoginUserDTO, RegisterUserDTO } from './DTO/user.dto';
import { UserService } from './user.service';
import { JWTGuard } from 'src/guards/JWT.guard';
import { User } from 'src/custom.decorator/user.decorator';

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
  @UseGuards(JWTGuard)
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.userService.findUserById(id);
  }

  // Edit the user profile.
  @UseGuards(JWTGuard)
  @Put('edit-profile')
  editProfile(@Body() body: EditUserDTO, @User('ID') id: number) {
    return this.userService.editUserProfile(body, id);
  }
}

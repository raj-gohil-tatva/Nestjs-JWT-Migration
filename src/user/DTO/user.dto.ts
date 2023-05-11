import { IsEmail, IsString } from 'class-validator';

export class RegisterUserDTO {
  @IsEmail()
  Email: string;

  @IsString()
  Password: string;

  @IsString()
  FirstName: string;

  @IsString()
  LastName: string;
}

import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { EditUserDTO, RegisterUserDTO } from './DTO/user.dto';
import { MessageConstant } from 'src/utilities/constant';
import { compareHashedPassword } from 'src/utilities/helper';
import { JWTConfig } from 'src/config/JWT.config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async register(body: RegisterUserDTO): Promise<User> {
    // Make the email lowercase.
    Object.assign(body, {
      Email: body.Email.toLowerCase(),
    });
    // Find the email already exist or not.
    const findUser = await this.userRepository.findOne({
      where: {
        Email: body.Email,
      },
      select: ['ID'],
    });
    // Throw error if user already exist in the system.
    if (findUser) {
      throw new BadRequestException(MessageConstant.UserAlreadyExist);
    }
    /**
     * Similarly You can do something like this to create the new use in the one simple step.
     * return this.userRepository.insert(body);
     */
    // Create the user.
    const userData = this.userRepository.create(body);
    // Save the user to the database.
    const createdUser = await this.userRepository.save(userData);
    // Delete the password property.
    delete createdUser.Password;
    return createdUser;
  }

  async login(email: string, password: string): Promise<User> {
    // Make the email lowercase.
    email = email.toLowerCase();
    // Find the user by email id.
    const user = await this.userRepository.findOne({
      where: {
        Email: email,
      },
      select: ['ID', 'Email', 'Password', 'FirstName', 'LastName'],
    });
    // Throw error if no matching record found for the email.
    if (!user) {
      throw new NotFoundException(MessageConstant.UserDoesNotExist);
    }
    const isPasswordMatch = await compareHashedPassword(
      password,
      user.Password,
    );
    if (!isPasswordMatch) {
      throw new NotFoundException(MessageConstant.InvalidPassword);
    }
    // Delete the password property.
    delete user.Password;
    // Sign the data to JWT and return the token.
    // Note: here the sign method of jwt requires an plain object so we have to just destruct the user object.
    const jwtToken = jwt.sign({ ...user }, JWTConfig.JWTSecretKey, {
      expiresIn: JWTConfig.TimeExpiry,
    });
    Object.assign(user, {
      Token: jwtToken,
    });
    return user;
  }

  async findUserById(id: number): Promise<User> {
    // Find the user by the provided id.
    const userData = await this.userRepository.findOne({
      where: {
        ID: id,
      },
    });
    // Throw error if the requested user does not found in the system.
    if (!userData) {
      throw new NotFoundException(MessageConstant.UserNotFound);
    }
    return userData;
  }

  async editUserProfile(body: EditUserDTO, id: number): Promise<User> {
    // Find the user with provided id.
    const findUser = await this.userRepository.findOne({
      where: {
        ID: id,
      },
      select: ['ID', 'Email', 'Password', 'FirstName', 'LastName'],
    });
    // Throw error if the requested user does not found in the system.
    if (!findUser) {
      throw new NotFoundException(MessageConstant.UserNotFound);
    }
    const updatedUser = { ...findUser, ...body };
    const updatedUserData = await this.userRepository.save(updatedUser);
    // Delete the password property.
    delete updatedUserData.Password;
    // Alternatively you could do as well return this.userRepository.update({ ID: id }, body);
    return updatedUserData;
  }
}

import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/db/entities/user.entity';
import { RegisterUserDTO } from './DTO/user.dto';
import { MessageConstant } from 'src/utilities/constant';

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
    return this.userRepository.save(userData);
  }
}

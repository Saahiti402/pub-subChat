import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity/user.entity';
 // Your User Entity

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Adding the findOne method
  async findOne(username: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ username });
  }
}

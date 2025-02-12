import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../../database/message.entity/message.entity';
import { UserService } from '../../database/user/user.service';
 // Import UserService

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private readonly userService: UserService, // Inject UserService to fetch the user
  ) {}

  async createMessage(username: string, content: string): Promise<Message> {
    const user = await this.userService.findOne(username);

    if (!user) {
      throw new Error('User not found');
    }

    const message = this.messageRepository.create({
      content, // Make sure the content property exists in the Message entity
      user, // Associate the user with the message
    });

    return this.messageRepository.save(message); // Save the message
  }
}

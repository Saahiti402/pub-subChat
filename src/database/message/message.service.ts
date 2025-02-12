import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../message.entity/message.entity';
import { User } from '../user.entity/user.entity';


@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Inject the User repository
  ) {}

  // Updated createMessage method to accept both user and content
  async createMessage(user: User, content: string): Promise<Message> {
    const newMessage = this.messageRepository.create({ content, user }); // Create a new message
    return await this.messageRepository.save(newMessage); // Save and return the message
  }

  // Save message method (already present)
  async saveMessage(content: string): Promise<Message> {
    const newMessage = this.messageRepository.create({ content });
    return await this.messageRepository.save(newMessage);
  }
}

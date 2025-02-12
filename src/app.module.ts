import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/user.entity/user.entity';
import { Message } from './database/message.entity/message.entity';
import { ChatGateway } from './chat/chat/chat.gateway';
import { KafkaConsumerService } from './kafka/kafka-consumer/kafka-consumer.service';
import { MessageService } from './database/message/message.service';
import { UserService } from './database/user/user.service';
  // Message Entity

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Saahiti@123',
      database: 'chat',
      entities: [User, Message],
      synchronize: true,
    }),  // Include your entities here
  ],
  providers: [
    ChatGateway,  // Include the ChatGateway
    KafkaConsumerService,  // Include Kafka Consumer Service
    MessageService,  // Include Message Service
    UserService,  // Include User Service
  ],
})
export class AppModule {}

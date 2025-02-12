import { Module } from '@nestjs/common';
import { MessageModule } from '../database/message/message.module';
import { KafkaConsumerService } from './kafka-consumer/kafka-consumer.service';
import { ChatGateway } from '../chat/chat/chat.gateway';

@Module({
  imports: [MessageModule], // Import the MessageModule
  providers: [KafkaConsumerService, ChatGateway], // Add ChatGateway and KafkaConsumerService
  exports: [KafkaConsumerService], // Export KafkaConsumerService if needed in other modules
})
export class KafkaModule {}

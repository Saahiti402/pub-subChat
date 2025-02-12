import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Kafka, Consumer, Producer, logLevel } from 'kafkajs';
import { ChatGateway } from '../../chat/chat/chat.gateway';


@Injectable()
export class KafkaConsumerService {
  private kafka: Kafka;
  private consumer: Consumer;
  private producer: Producer;

  // Injecting ChatGateway using forwardRef to handle circular dependency
  constructor(
    @Inject(forwardRef(() => ChatGateway)) private readonly chatGateway: ChatGateway,
  ) {
    this.kafka = new Kafka({
      clientId: 'chat-app-client',
      brokers: ['localhost:9092'], // Adjust to your Kafka setup
      logLevel: logLevel.INFO,
    });

    this.consumer = this.kafka.consumer({ groupId: 'chat-group' });
    this.producer = this.kafka.producer();
  }

  // Start consuming messages from Kafka
  async consumeMessages() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'chat-topic', fromBeginning: true });

    // Handle incoming Kafka messages
    this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const messageContent = message.value?.toString();
        console.log('Received message from Kafka:', messageContent);

        // Broadcast the message to all WebSocket clients
        if (messageContent) {
          this.chatGateway.broadcastMessage(messageContent);
        }
      },
    });
  }

  // Produce a message to Kafka
  async produceMessage(message: string) {
    await this.producer.connect();
    await this.producer.send({
      topic: 'chat-topic',
      messages: [{ value: message }],
    });
    console.log('Message sent to Kafka:', message);
  }

  // Disconnect the producer and consumer
  async disconnect() {
    await this.consumer.disconnect();
    await this.producer.disconnect();
  }
}

import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaProducerService {
  private kafka = new Kafka({
    brokers: ['localhost:9093'], // Kafka broker
  });
  private producer = this.kafka.producer();

  async sendMessage(topic: string, message: string) {
    await this.producer.connect();
    await this.producer.send({
      topic,
      messages: [
        {
          value: message, // Kafka message requires 'value' property
        },
      ],
    });
    await this.producer.disconnect();
  }
}

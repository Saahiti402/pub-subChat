import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { KafkaConsumerService } from './kafka/kafka-consumer/kafka-consumer.service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Initialize and start the Kafka consumer when the app starts
  const kafkaConsumerService = app.get(KafkaConsumerService);
  await kafkaConsumerService.consumeMessages(); // Start consuming messages

  await app.listen(3000); // Start the NestJS application
}
bootstrap();

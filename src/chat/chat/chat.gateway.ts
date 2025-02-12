// chat.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Inject, forwardRef } from '@nestjs/common';
import { KafkaConsumerService } from '../../kafka/kafka-consumer/kafka-consumer.service';
import { MessageService } from '../../database/message/message.service';
import { UserService } from '../../database/user/user.service';


@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    @Inject(forwardRef(() => KafkaConsumerService))
    private kafkaConsumerService: KafkaConsumerService,
    private messageService: MessageService,
    private userService: UserService,
  ) {}

  afterInit() {
    console.log('Chat Gateway Initialized');
  }

  handleConnection(client: Socket) {
    console.log('Client connected: ', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected: ', client.id);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() payload: { username: string, content: string }): Promise<void> {
    const { username, content } = payload;

    const user = await this.userService.findOne(username);
    if (!user) {
      throw new Error('User not found');
    }

    const message = await this.messageService.createMessage(user, content);
    this.server.emit('receiveMessage', message);  // Emit the message to all connected clients
  }

  // New method to broadcast messages
  broadcastMessage(messageContent: string): void {
    this.server.emit('receiveMessage', messageContent);
  }
  onMessage(client: Socket, payload: string): WsResponse<string> {
    return { event: 'message', data: payload };
  }
}

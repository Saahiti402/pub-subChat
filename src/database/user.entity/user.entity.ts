import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Message } from '../message.entity/message.entity';
 // Adjust path accordingly

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column() // Add password field
  password: string;

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];
}

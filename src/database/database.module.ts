import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
 // Adjust path if necessary
;
import { User } from './user.entity/user.entity';
import { UserService } from './user/user.service';
import { MessageService } from './message/message.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, MessageService],
  exports: [UserService], // Export to use in other modules
})
export class DatabaseModule {}

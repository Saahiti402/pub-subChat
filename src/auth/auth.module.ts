import { Module } from '@nestjs/common';


import { DatabaseModule } from '../database/database.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller'; // Import the DatabaseModule

@Module({
  imports: [DatabaseModule], // Add DatabaseModule here
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt'; // If you're hashing the password
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../database/user/user.service'; // If you're using JWT for authentication

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // Find the user by username
    const user = await this.userService.findOne(username);
    if (!user) {
      return null; // User not found
    }

    // If you are using hashed passwords, compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (!isPasswordValid) {
      return null; // Password is incorrect
    }

    // If password is correct, return the user data (you can exclude the password here)
    const { password, ...result } = user; // Exclude the password
    return result; // Return user object (without password)
  }

  // If you're generating a JWT token
  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

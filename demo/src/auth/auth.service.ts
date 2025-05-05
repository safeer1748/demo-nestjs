import { Injectable,  UnauthorizedException,BadRequestException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

import { LoginAuthDto } from './dto/login-auth.dto'
import { SignupAuthDto } from './dto/signup-auth.dto'
@Injectable()
export class AuthService {

 // Dummy users array
 private users = [
  { id: 1, username:'user1', email: 'user@example.com', password: 'user123' },
  { id: 2, username:'user2', email: 'admin@example.com', password: 'admin123' }
]

//login dto
async login(dto: LoginAuthDto) {
  const { email, password } = dto

  // Find user by email
  const user = this.users.find(u => u.email === email && u.password === password)

  if (!user) {
    throw new UnauthorizedException('Invalid credentials')
  }

  return { message: 'Login successful', user }
}

 // signup dto 
async signup(dto: SignupAuthDto) {
  const { username, email, password } = dto;

  // Check if email or username already exists
  const existingUser = this.users.find(
    user => user.email === email || user.username === username
  );

  if (existingUser) {
    throw new BadRequestException('User with this email or username already exists');
  }

  // Add new user
  const newUser = {
    id: this.users.length + 1,
    username,
    email,
    password, // Note: You should hash the password before storing in real apps
  };

  this.users.push(newUser);

  return { message: 'Signup successful', user: newUser };
}


  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}

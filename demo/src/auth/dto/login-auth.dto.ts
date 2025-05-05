import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class LoginAuthDto {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string

  @IsNotEmpty({ message: 'Password is required' })
  password: string
}
import { IsEmail, IsEnum, IsPhoneNumber, IsString } from 'class-validator';
import { UserRole } from '../user.types';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(UserRole)
  role: string;

  @IsPhoneNumber()
  phone: string;
}
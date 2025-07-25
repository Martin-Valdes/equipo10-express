import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsEmail()
  @Expose()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsEmail()
  @Expose()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsEmail()
  @Expose()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  @Exclude()
  password: string;

  @IsString()
  @Expose()
  @IsNotEmpty()
  @ApiProperty()
  roles: string[];
}

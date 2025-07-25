import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';



import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'El campo de correo electrónico no puede estar vacío.',
  })

  @IsString({ message: 'El correo electrónico debe ser una cadena de texto.' })
  @IsEmail({}, { message: 'Debe proporcionar un correo electrónico válido.' })
  email: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()

  lastName?: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @ApiProperty()
  @Exclude()
  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  @MaxLength(20, {
    message: 'La contraseña no puede tener más de 20 caracteres.',
  })
  password?: string;

  @IsString()
  @IsOptional()
  googleId?: string;

  @IsString()
  @IsOptional()
  isVerified?: boolean;

  @IsString()
  @IsOptional()
  roles?: string[];
}

import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateEmailResponseDto {
  @IsNotEmpty({ message: 'El email del cliente es obligatorio' })
  @IsEmail({}, { message: 'El email debe ser valido' })
  clientEmail: string;

  @IsNotEmpty({ message: 'El prompt es obligatorio' })
  prompt: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateEmailResponseDto {
  @ApiProperty({
    description: 'El email del cliente que quiere consultar a la empresa',
    example: 'sparker@gmail.com',
    format: 'email',
  })
  @IsNotEmpty({ message: 'El email del cliente es obligatorio' })
  @IsEmail({}, { message: 'El email debe ser valido' })
  clientEmail: string;

  @ApiProperty({
    description:
      'El mensaje que nos ha enviado el cliente, el cual sera usado como prompt',
    example:
      'Hola, estoy interasado en adquirir sus servicios de ventas de bienes raices. Como puedo saber mas?',
    maxLength: 1000,
  })
  @IsString({ message: 'El prompt debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El prompt es obligatorio' })
  prompt: string;

  @IsBoolean()
  @IsOptional()
  isFavorite?: boolean;
}

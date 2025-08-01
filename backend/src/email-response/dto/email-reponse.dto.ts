import { ApiProperty } from '@nestjs/swagger';
import { Client } from '../../client/entities/client.entity';

const clientExample = {
  id: 1,
  name: 'Christopher',
  lastName: 'Wilkins',
  email: 'sparker@gmail.com',
  company: 'MacDonald, Robinson & McHughes',
  interests: 'bienes raices, inversiones',
  lastInteraction: '2023-10-27T10:00:00.000Z',
  segment: 'Nuevo Lead',
  createdAt: '2023-10-27T10:00:00.000Z',
  updatedAt: '2023-10-27T10:00:00.000Z',
};

export class EmailResponseDto {
  @ApiProperty({
    description: 'Id unico del email de respuesta generado con IA',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Email del cliente utilizado como prompt base para la IA',
    example: 'Que es EasyemAIl?',
  })
  prompt: string;

  @ApiProperty({
    description: 'Contenido en texto plano de la respuesta generada con IA',
    example:
      'EasyemAIl es una aplicacion que ayuda a empresas en la atencion electronica de sus clientes...',
  })
  content: string;

  @ApiProperty({
    description: 'Etiqueta de clasificacion del objeto',
    example: 'Consulta detallada',
  })
  tag: string | null | undefined;

  @ApiProperty({
    description: 'El modelo de IA utilizado para generar la respuesta',
    example: 'mistral-tiny',
  })
  model: string;

  @ApiProperty({
    description: 'Email del cliente utilizado como prompt base para la IA',
    example: 'Que es EasyemAIl?',
  })
  isFavorite: boolean;

  @ApiProperty({
    description: 'Fecha y hora de creación de la respuesta.',
    example: '2023-10-27T10:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha y hora de actualizacion de la respuesta.',
    example: '2023-10-27T10:00:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Datos del cliente asociado a la respuesta',
    example: clientExample,
  })
  client: Client;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateEmailResponseDto {
  @ApiProperty({ example: true, description: 'Marcar como favorito' })
  @IsOptional()
  @IsBoolean()
  favorite?: boolean;
}

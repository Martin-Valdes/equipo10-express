// src/integracion/dto/rag-query.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class RagQueryDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  email_text: string;
}

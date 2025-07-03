import { IsString } from 'class-validator';

export class AskMistralDto {
  @IsString()
  prompt: string;
}
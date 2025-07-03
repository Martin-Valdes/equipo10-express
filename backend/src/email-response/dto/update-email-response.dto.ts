import { PartialType } from '@nestjs/mapped-types';
import { CreateEmailResponseDto } from './create-email-response.dto';

export class UpdateEmailResponseDto extends PartialType(CreateEmailResponseDto) {}

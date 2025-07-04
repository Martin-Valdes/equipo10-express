import { Module } from '@nestjs/common';
import { EmailResponseService } from './email-response.service';
import { EmailResponseController } from './email-response.controller';
import { LlmApiModule } from '../llm-api/llm-api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailResponse } from './entities/email-response.entity';
import { Client } from '../client/entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmailResponse, Client]), LlmApiModule],
  controllers: [EmailResponseController],
  providers: [EmailResponseService],
})
export class EmailResponseModule {}

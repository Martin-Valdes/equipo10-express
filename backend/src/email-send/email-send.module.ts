// src/email/email.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email } from './entities/email-send.entity';
import { EmailService } from './email-send.service';
import { EmailController } from './email-send.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Email])],
  providers: [EmailService],
  controllers: [EmailController],
})
export class EmailModule {}

// src/email/email.controller.ts
import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { EmailService } from './email-send.service';
import { SendEmailDto } from './dto/send-email.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('Email')
@ApiBearerAuth()
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @UseGuards(JwtAuthGuard)

  @Post('send')
  async send(@Body() dto: SendEmailDto, @Req() req: any) {
    const user = req.user;
    return this.emailService.sendEmail(dto.to, dto.subject, dto.content, user);
  }

  
}

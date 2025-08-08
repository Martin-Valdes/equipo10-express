// src/email/email.controller.ts
import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { EmailService } from './email-send.service';
import { SendEmailDto } from './dto/send-email.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorators';
import { Role } from '../auth/roles.enum';

@ApiTags('Email')
@ApiBearerAuth()
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @UseGuards(JwtAuthGuard)
  @Post('send')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.USER)
  async send(@Body() dto: SendEmailDto, @Req() req: any) {
    const user = req.user;
    return this.emailService.sendEmail(dto.to, dto.subject, dto.content, user);
  }
  @Get('sent')
  getAllSentEmails() {
    return this.emailService.getAllEmails();
  }
}

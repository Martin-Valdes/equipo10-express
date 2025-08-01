import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Email } from './entities/email-send.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(Email)
    private emailRepo: Repository<Email>,
  ) {}

  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,      
      pass: process.env.MAIL_PASS,       
    },
  });

  async sendEmail(to: string, subject: string, content: string, user: User) {
    await this.transporter.sendMail({
      from: `"Mi App" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html: content,
      replyTo: user.email, 
    });

    const email = this.emailRepo.create({ to, subject, content, user });
    return this.emailRepo.save(email);
  }

  async getAllEmails(): Promise<Email[]> {
    return this.emailRepo.find();
  }
}

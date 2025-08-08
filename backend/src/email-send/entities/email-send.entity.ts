// src/email/email.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Email {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  to: string;

  @Column()
  subject: string;

  @Column('text')
  content: string;

  @CreateDateColumn()
  sentAt: Date;

  @ManyToOne(() => User, user => user.emails, { eager: true })
  user: User;
}

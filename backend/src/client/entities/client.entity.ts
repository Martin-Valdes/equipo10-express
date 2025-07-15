import { EmailResponse } from '../../email-response/entities/email-response.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 30,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 30,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  company: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  interests: string;

  @Column({ type: 'date', nullable: true })
  lastInteraction: Date;

  @Column({
    type: 'varchar',
    length: 20,
  })
  segment: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  //   Relations
  @OneToMany(() => EmailResponse, (emailResponse) => emailResponse.client)
  emailResponses: EmailResponse[];
}

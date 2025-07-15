import { Client } from '../../client/entities/client.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class EmailResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
  })
  content: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  tag: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  model: string;

  @Column({ type: 'text' })
  prompt: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  //   Relations
  @ManyToOne(() => Client, (client) => client.emailResponses)
  client: Client;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Contact } from '../../contacts/entities/contact.entity';
import { Email } from '../../email-send/entities/email-send.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({
    type: 'varchar',
    length: 30,
  })
  firstName: string;

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
    length: 100,
    nullable: true,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  roles: string[];

  @Column({ nullable: true })
  googleId: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => Contact, (contact) => contact.owner, {
    cascade: true,
    eager: false,
  })
  contacts: Contact[];

  @OneToMany(() => Contact, (contact) => contact.owner, {
    cascade: true,
    eager: false,
  })
  emails: Email[];
}

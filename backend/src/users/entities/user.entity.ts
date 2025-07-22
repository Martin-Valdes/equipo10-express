import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
    nullable: true 
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true 
  })
  role: string;

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
}

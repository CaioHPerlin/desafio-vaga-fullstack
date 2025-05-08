import { TaskStatus } from 'src/tasks/constants/task-status.enum';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

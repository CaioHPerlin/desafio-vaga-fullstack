import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsIn } from 'class-validator';
import { TaskStatus } from 'src/tasks/constants/task-status.enum';

export class TaskFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus, {
    message: `status must be one of: ${Object.values(TaskStatus).join(', ')}`,
  })
  @ApiPropertyOptional({
    description:
      'Filter tasks by status, if ommitted will return all kinds of task',
    enum: TaskStatus,
    example: TaskStatus.PENDING,
  })
  status?: TaskStatus;

  @IsOptional()
  @IsIn(['createdAt', 'updatedAt'], {
    message: 'sortBy must be one either createdAt or updatedAt',
  })
  @ApiPropertyOptional({
    description: 'Sort tasks by creation or update date',
    enum: ['createdAt', 'updatedAt'],
    example: 'createdAt',
  })
  sortBy?: 'createdAt' | 'updatedAt';

  @IsOptional()
  @IsIn(['ASC', 'DESC'], {
    message: 'order must be either ASC or DESC',
  })
  @ApiPropertyOptional({
    description: 'Order tasks in ascending or descending order',
    enum: ['ASC', 'DESC'],
    default: 'DESC',
  })
  order?: 'ASC' | 'DESC';
}

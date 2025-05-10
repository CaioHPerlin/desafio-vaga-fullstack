import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { TaskStatus } from 'src/tasks/constants/task-status.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsOptional()
  @IsString()
  @Length(1, 100, {
    message: 'title must be between 1 and 100 characters',
  })
  @ApiPropertyOptional({
    description: 'The title of the task',
    example: 'Complete the project documentation',
    minLength: 1,
    maxLength: 100,
  })
  title?: string;

  @IsOptional()
  @IsString()
  @Length(1, 500, {
    message: 'description must be between 1 and 500 characters',
  })
  @ApiPropertyOptional({
    description: 'A detailed description of the task',
    example: 'Write the documentation for the project, including API details.',
    minLength: 1,
    maxLength: 500,
  })
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus, {
    message: `status must be one of: ${Object.values(TaskStatus).join(', ')}`,
  })
  @ApiPropertyOptional({
    description: 'The status of the task',
    enum: TaskStatus,
    example: TaskStatus.PENDING,
  })
  status?: TaskStatus;
}

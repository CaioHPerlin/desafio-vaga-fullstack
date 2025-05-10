import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { TaskStatus } from 'src/tasks/constants/task-status.enum';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100, {
    message: 'title must be between 1 and 100 characters',
  })
  @ApiProperty({
    description: 'The title of the task',
    example: 'Complete the project documentation',
    minLength: 1,
    maxLength: 100,
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 500, {
    message: 'description must be between 1 and 500 characters',
  })
  @ApiProperty({
    description: 'A detailed description of the task',
    example: 'Write the documentation for the project, including API details.',
    minLength: 1,
    maxLength: 500,
  })
  description: string;

  @IsOptional()
  @IsEnum(TaskStatus, {
    message: `status must be one of: ${Object.values(TaskStatus).join(', ')}`,
  })
  @ApiPropertyOptional({
    description: 'The status of the task, defaults to pending',
    enum: TaskStatus,
    example: TaskStatus.PENDING,
  })
  status?: TaskStatus;
}

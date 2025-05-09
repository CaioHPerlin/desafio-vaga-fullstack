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
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 500, {
    message: 'description must be between 1 and 500 characters',
  })
  description: string;

  @IsOptional()
  @IsEnum(TaskStatus, {
    message: `status must be one of: ${Object.values(TaskStatus).join(', ')}`,
  })
  status?: TaskStatus;
}

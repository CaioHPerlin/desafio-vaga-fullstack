import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { TaskStatus } from 'src/tasks/constants/task-status.enum';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100, {
    message: 'Title must have a maximum of 100 characters',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(TaskStatus, {
    message: `Status must be one of: ${Object.values(TaskStatus).join(', ')}`,
  })
  status?: TaskStatus;
}

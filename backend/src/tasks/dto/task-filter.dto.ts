import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from 'src/tasks/constants/task-status.enum';

export class TaskFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  sortBy?: 'createdAt' | 'updatedAt';

  @IsOptional()
  order?: 'ASC' | 'DESC';
}

import { IsEnum, IsOptional, IsIn } from 'class-validator';
import { TaskStatus } from 'src/tasks/constants/task-status.enum';

export class TaskFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus, {
    message: `status must be one of: ${Object.values(TaskStatus).join(', ')}`,
  })
  status?: TaskStatus;

  @IsOptional()
  @IsIn(['createdAt', 'updatedAt'], {
    message: 'sortBy must be one either createdAt or updatedAt',
  })
  sortBy?: 'createdAt' | 'updatedAt';

  @IsOptional()
  @IsIn(['ASC', 'DESC'], {
    message: 'order must be either ASC or DESC',
  })
  order?: 'ASC' | 'DESC';
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create(createTaskDto);
    return this.tasksRepository.save(task);
  }

  async findAll(filterDto?: TaskFilterDto): Promise<Task[]> {
    const { status, sortBy = 'createdAt', order = 'DESC' } = filterDto || {};

    const queryBuilder = this.tasksRepository
      .createQueryBuilder('task')
      .orderBy(`task.${sortBy}`, order);

    if (status) {
      queryBuilder.andWhere('task.status = :status', { status });
    }

    return queryBuilder.getMany();
  }

  async findOne(id: number): Promise<Task | null> {
    return this.tasksRepository.findOneBy({ id });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    if (!task) throw new NotFoundException(`Task with id ${id} not found`);

    return this.tasksRepository.save({
      ...updateTaskDto,
      id,
    });
  }

  async remove(id: number) {
    const task = await this.findOne(id);
    if (!task) throw new NotFoundException(`Task with id ${id} not found`);

    this.tasksRepository.delete(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TaskFilterDto } from 'src/tasks/dto/task-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiTags('tasks') // Grouping under "tasks" in Swagger
@ApiBearerAuth() // Indicates that all endpoints require a Bearer token
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({
    description: 'Details of the task to be created',
    type: CreateTaskDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Task successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all tasks with optional filters' })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filter tasks by status',
    schema: {
      type: 'string',
      enum: ['pending', 'inProgress', 'done'],
    },
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'Sort tasks by creation or update date',
    schema: {
      type: 'string',
      enum: ['createdAt', 'updatedAt'],
    },
  })
  @ApiQuery({
    name: 'order',
    required: false,
    description: 'Order tasks in ascending or descending order',
    schema: {
      type: 'string',
      enum: ['ASC', 'DESC'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'List of tasks retrieved successfully',
  })
  async findAll(@Query() filterDto: TaskFilterDto) {
    return this.tasksService.findAll(filterDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific task by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the task to retrieve',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Task retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific task by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the task to update',
    example: 1,
  })
  @ApiBody({
    description: 'Details of the task to be updated (all fields are optional)',
    type: UpdateTaskDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a specific task by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the task to delete',
    example: 1,
  })
  @ApiResponse({
    status: 204,
    description: 'Task deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.remove(id);
  }
}

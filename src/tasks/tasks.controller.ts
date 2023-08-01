import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks } from './models/task.entity';
import { TaskCreateDto } from './dto/TaskCreateDto';
import { TaskUpdateDto } from './dto/TaskUpdateDto';

@Controller('tasks')
export class TasksController {
  constructor(private service: TasksService) {}

  @Get() // el Tasks hace referencia a la clase declarada en task.entity.ts
  async getTask(): Promise<Tasks[]> {
    return await this.service.getAllTask();
  }

  @Post()
  async createTask(@Body() dto: TaskCreateDto): Promise<Tasks> {
    return await this.service.createTask(dto);
  }

  @Get('/:id') // el Tasks hace referencia a la clase declarada en task.entity.ts
  async getTaskById(@Param() params: any): Promise<Tasks> {
    return await this.service.getAllTaskById(params.id);
  }

  @Put('/:id')
  async updateTask(
    @Param() params: any,
    @Body() dto: TaskUpdateDto,
  ): Promise<Tasks> {
    return await this.service.updateTask(params.id, dto);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tasks } from './models/task.entity';
import { TaskCreateDto } from './dto/TaskCreateDto';
import { TaskUpdateDto } from './dto/TaskUpdateDto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Tasks)
    private readonly taskModel: typeof Tasks,
  ) {}
  //esta función se llama en el controller en el get
  async getAllTask(): Promise<Tasks[]> {
    return await this.taskModel.findAll(); //findAll lo uso cuando voy a devolver un arreglo, en este caso Tasks[]
  }

  async getAllTaskById(_id: number): Promise<Tasks> {
    return await this.taskModel.findOne({
      //findOne lo uso cuando voy a devolver un solo dato, en este caso Tasks
      where: {
        id: _id,
      },
    });
  }

  //TaskCreateDto se le pasa el objeto creado en dto de task.create.dto.ts
  //createTask se llama en el controller en el post
  async createTask(dto: TaskCreateDto): Promise<Tasks | any> {
    //el any indica que podemos devolver diferentes JSON no uno solo
    return await this.taskModel
      .create({
        title: dto.title,
        datetime: dto.datetime,
        priority: dto.priority,
        description: dto.description,
      })
      .then((response) => response)
      .catch((error) => {
        console.log(error); //con esto podemos hacer que el error aparezca internamente y que el desarrollador pueda encontrarlo con facilidad
        return { 'message error': "You've used this title before" };
      }); // esto devuelve un error cuando estos datos ya han sido ingresados, se pone para evitar duplicaciones de datos
  }

  async updateTask(_id: number, dto: TaskUpdateDto): Promise<Tasks | any> {
    return await this.taskModel
      .update(
        {
          title: dto.title,
          datetime: dto.datetime,
          priority: dto.priority,
          description: dto.description,
        },
        {
          where: { id: _id },
        },
      )
      .then((response) => response)
      .catch((error) => {
        console.log(error); //con esto podemos hacer que el error aparezca internamente y que el desarrollador pueda encontrarlo con facilidad
        return { 'message error': 'Your task cannot update' };
      });
  }

  async deleteTask(_id: number): Promise<number> {
    return await this.taskModel.destroy({
      where: { id: _id },
    });
  }
}

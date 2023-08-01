import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tasks } from './models/task.entity';

@Module({
  imports: [SequelizeModule.forFeature([Tasks])], //Importación base de datos( se le pasan Tasks dentro de un arreglo porque pueden ser varias)
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}

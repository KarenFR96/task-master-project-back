import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from './models/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([Users])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

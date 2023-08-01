import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './models/user.model';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private readonly usersModel: typeof Users,
  ) {}

  findAll(): Promise<Users[]> {
    return this.usersModel.findAll();
  }

  async insert(dto: CreateUserDto): Promise<Users> {
    return await this.usersModel
      .create({
        name: dto.name,
        lastName: dto.lastName,
        email: dto.email,
        password: dto.password,
      })
      .then((response) => response) // esto devuelve un error cuando estos datos ya han sido ingresados
      .catch((error) => error); // esto devuelve un error (error 500 o 400) cuando estos datos ya han sido ingresados, se pone para evitar duplicaciones de datos
  }

  async queryLogin(dto: UserLoginDto): Promise<Users | any> {
    const user = await this.usersModel.findOne({
      where: { email: dto.email, password: dto.password },
      attributes: ['name', 'lastName'],
    });
    if (user === null) {
      return { message: 'No existe el usuario' };
    } else {
      return user;
    }
  }
}

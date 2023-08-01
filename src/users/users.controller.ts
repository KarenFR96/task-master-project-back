import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './models/user.model';
import { UsersService } from './users.service';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  getAllUsers(): Promise<Users[] | any> {
    // para que se usa la palabra any ??
    return this.service.findAll();
  }

  @Post()
  createUser(@Body() createUser: CreateUserDto): Promise<Users | any> {
    return this.service.insert(createUser); // porque no se pone createUser en vez de insert??
  }

  @Post('/login')
  login(@Body() login: UserLoginDto): Promise<Users | any> {
    return this.service.queryLogin(login).catch((error) => {
      console.log(error);
    }); // cual es la función del queryLogin??
  }
}

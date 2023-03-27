import { Body, Controller, Get, Query, Post, HttpCode } from '@nestjs/common';
import { User } from 'entities/User';
import { UsersService } from './users.service';

@Controller('/')
export class AppController {
  constructor(private readonly usersService: UsersService) {}

  @Get("login")
  login(@Body() user: User){
    return this.usersService.login(user);
  }

  @Post("register")
  register(@Body() user: User){
     return this.usersService.register(user);
  }

  @Get("users")
  getUsers(){
    return this.usersService.findAll();
  }
}

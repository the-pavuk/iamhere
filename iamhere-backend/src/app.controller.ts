import { Body, Controller, Get, Query, Post, HttpCode, Param } from '@nestjs/common';
import { User } from 'entities/User';
import { UsersService } from './users.service';

@Controller('/api/')
export class AppController {
  constructor(private readonly usersService: UsersService) {}

  @Post("login")
  login(@Body() user: User){
    return this.usersService.login(user);
  }

  @Get("getUser")
  getUser(@Param("access_token") token: string){
    return this.usersService.findByToken(token);
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

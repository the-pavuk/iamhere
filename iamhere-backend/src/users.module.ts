import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { AppController } from './app.controller';
import { User } from 'entities/User';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
    secret: 'secretKey',
    signOptions: { expiresIn: '14d' }})],
  providers: [UsersService],
  controllers: [AppController],
})
export class UsersModule {
  
}
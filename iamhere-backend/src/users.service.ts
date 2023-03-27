import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'entities/User';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,private jwtService: JwtService
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
  async register(user: User){
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    await this.usersRepository.insert(user).catch((e => {
        throw new BadRequestException("Account with this nickname already registered!");
    }));
    return {statusCode: 201, message: "Successfully registered!"}
  }
  async login(user: User){
    const val_user = await this.usersRepository.findOneBy({nickname: user.nickname})
    if (!val_user){
        throw new UnauthorizedException();
    }
    const isMatch = await bcrypt.compare(user.password, val_user.password);
    if (!isMatch){
        throw new UnauthorizedException();
    }
    const payload = {nickname: user.nickname, password: val_user.password, id: val_user.id}
    return { access_token: this.jwtService.sign(payload) };
  }
}
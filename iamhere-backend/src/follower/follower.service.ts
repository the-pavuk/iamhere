import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follower } from './follower.entity';

@Injectable()
export class FollowerService {
  constructor(
    @InjectRepository(Follower) private postsRepository: Repository<Follower>,
    private jwtService: JwtService, 
  ) {}

  async unFollow(id: number): Promise<void> {
    await this.postsRepository.delete(id);
  }

  async follow(follower:Follower){
    let isValid: Boolean;

    try {
      isValid = await this.jwtService.verify(follower.access_token);
    } catch{
      throw new UnauthorizedException();
    }

    if(!isValid) {
      throw new UnauthorizedException();
    } else{
        const decodedJwt = this.jwtService.verify(follower.access_token);
        follower.follower_id = decodedJwt.id;
        await this.postsRepository.insert(follower).catch((e =>{
            throw new BadRequestException("Bad request:( stderr: " + e);
        }))
        return {message: "Successfully followed!", code: 201}
    }
  }

}
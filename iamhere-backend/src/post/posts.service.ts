import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postsRepository: Repository<Posts>,
    private jwtService: JwtService, 
  ) {}


  findAll(): Promise<Posts[]> {
    return this.postsRepository.find();
  }
  findOne(id: number): Promise<Posts> {
    return this.postsRepository.findOneBy({ id: id });
  }
  async remove(id: number): Promise<void> {
    await this.postsRepository.delete(id);
  }

  async addPost(post:Posts){
    let isValid: Boolean;

    try {
      isValid = await this.jwtService.verify(post.access_token);
    } catch{
      throw new BadRequestException();
    }

    if(!isValid) {
        throw new UnauthorizedException();
    } else{
        const decodedJwt = this.jwtService.verify(post.access_token);
        post.user_id = decodedJwt.id;
        this.postsRepository.insert(post).catch((e =>{
            throw new BadRequestException();
        }))
        return {message: "Successfully posted!", code: 201}
    }
  }

}
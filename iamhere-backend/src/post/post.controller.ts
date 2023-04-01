import { Body, Controller, Get, Query, Post, HttpCode } from '@nestjs/common';
import { Posts } from './posts.entity';
import { PostsService } from './posts.service';


@Controller('api/post/')
export class PostController {
  constructor(private readonly postService: PostsService) {}

    @Post("add")
    addPost(@Body() post: Posts){
        return this.postService.addPost(post);
    }
}
import { Body, Controller, Get, Query, Post, HttpCode } from '@nestjs/common';
import { Follower } from './follower.entity';
import { FollowerService } from './follower.service';


@Controller('/api/')
export class FollowerController {
  constructor(private readonly postService: FollowerService) {}

    @Post("follow")
    follow(@Body() follower: Follower){
        return this.postService.follow(follower);
    }
}
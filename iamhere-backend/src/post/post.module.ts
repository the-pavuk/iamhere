import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostController } from './post.controller';
import { Posts } from './posts.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Posts]), JwtModule.register({
    secret: 'secretKey',
    signOptions: { expiresIn: '14d' }})],
  providers: [PostsService],
  controllers: [PostController],
})
export class PostModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { User } from 'entities/User';
import { DataSource } from 'typeorm';
import { UsersModule } from './users.module';
import { Posts } from './post/posts.entity';
import { PostModule } from './post/post.module';
import { FollowerModule } from './follower/follower.module';
import { Follower } from './follower/follower.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'rooot',
      database: 'iamhere',
      entities: [User, Posts, Follower],
      synchronize: true, // если у ЭТОЙ ХУЙНИ будет релиз, то убрать
    }), UsersModule, PostModule, FollowerModule
  ],
  providers: [AppService],
  exports: [AppModule]

})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

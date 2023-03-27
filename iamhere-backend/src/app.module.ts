import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { User } from 'entities/User';
import { DataSource } from 'typeorm';
import { UsersModule } from './users.module';
import { PostsService } from './post/posts.service';
import { Posts } from './post/posts.entity';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'iamhere',
      entities: [User, Posts],
      synchronize: true,
    }), UsersModule, PostModule,
  ],
  providers: [AppService],
  exports: [AppModule]

})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

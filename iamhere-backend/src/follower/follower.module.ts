import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowerService } from './follower.service';
import { FollowerController } from './follower.controller';
import { Follower } from './follower.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Follower]), JwtModule.register({
    secret: 'secretKey',
    signOptions: { expiresIn: '14d' }})],
  providers: [FollowerService],
  controllers: [FollowerController],
})
export class FollowerModule {}
import { Module } from '@nestjs/common';
import { FollowersFollowingService } from './followers-following.service';
import { FollowersFollowingController } from './followers-following.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowersFollowing } from './entities/followers-following.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FollowersFollowing])],
  controllers: [FollowersFollowingController],
  providers: [TypeOrmModule, FollowersFollowingService],
})
export class FollowersFollowingModule {}

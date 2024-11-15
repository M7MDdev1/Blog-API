import { Injectable } from '@nestjs/common';
import { CreateFollowersFollowingDto } from './dto/create-followers-following.dto';
import { UpdateFollowersFollowingDto } from './dto/update-followers-following.dto';

@Injectable()
export class FollowersFollowingService {
  create(createFollowersFollowingDto: CreateFollowersFollowingDto) {
    return 'This action adds a new followersFollowing';
  }

  findAll() {
    return `This action returns all followersFollowing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} followersFollowing`;
  }

  update(id: number, updateFollowersFollowingDto: UpdateFollowersFollowingDto) {
    return `This action updates a #${id} followersFollowing`;
  }

  remove(id: number) {
    return `This action removes a #${id} followersFollowing`;
  }
}

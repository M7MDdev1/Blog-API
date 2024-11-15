import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FollowersFollowingService } from './followers-following.service';
import { CreateFollowersFollowingDto } from './dto/create-followers-following.dto';
import { UpdateFollowersFollowingDto } from './dto/update-followers-following.dto';

@Controller('followers-following')
export class FollowersFollowingController {
  constructor(private readonly followersFollowingService: FollowersFollowingService) {}

  @Post()
  create(@Body() createFollowersFollowingDto: CreateFollowersFollowingDto) {
    return this.followersFollowingService.create(createFollowersFollowingDto);
  }

  @Get()
  findAll() {
    return this.followersFollowingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.followersFollowingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFollowersFollowingDto: UpdateFollowersFollowingDto) {
    return this.followersFollowingService.update(+id, updateFollowersFollowingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.followersFollowingService.remove(+id);
  }
}

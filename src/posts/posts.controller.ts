import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postServices: PostsService) {}

  @Post()
  @Header('content-type', 'application/json')
  async create(@Body() boody) {
    return this.postServices.create(boody);
  }

  @Get()
  @Header('content-type', 'application/json')
  async getPosts() {
    return this.postServices.getPosts();
  }

  @Get(':id')
  @Header('content-type', 'application/json')
  async getPost(@Param('id') postID) {
    return this.postServices.getPost(postID);
  }

  @Delete(':id')
  @Header('content-type', 'application/json')
  async deletePost(@Param('id') PostID) {
    return this.postServices.deletePost(PostID);
  }
}

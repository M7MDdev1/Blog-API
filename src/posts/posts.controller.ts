import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postServices: PostsService) {}
  @Post()
  async create(@Body() boody) {
    return this.postServices.create(boody);
  }

  @Get()
  async getPosts() {
    return this.postServices.getPosts();
  }

  @Get(':id')
  async getPost(@Param('id') postID) {
    return this.postServices.getPost(postID);
  }

  @Delete(':id')
  async deletePost(@Param('id') PostID) {
    return this.postServices.deletePost(PostID);
  }
}

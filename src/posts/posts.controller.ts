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
import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { Posts } from './entities/post.entity';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postServices: PostsService,
    private readonly dataSource: DataSource,
  ) {}

  @Post()
  @Header('content-type', 'application/json')
  async create(@Body() boody) {
    return this.postServices.create(boody);
  }

  @Public()
  @Get()
  @Header('content-type', 'application/json')
  async getPosts() {
    return this.postServices.getPosts();
  }

  @Public()
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

  @Public()
  @Post('faker')
  async faking() {
    const PostRepo = this.dataSource.getRepository(Posts);
    for (let i = 0; i < 1000; i++) {
      const article = {
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraphs(),
        // author: faker.book.author(),
      };
      await PostRepo.save(article);
    }
  }
}

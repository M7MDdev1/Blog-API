import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { Posts } from './entities/post.entity';
import { Public } from 'src/auth/decorators/public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postServices: PostsService,
    private readonly dataSource: DataSource,
  ) {}

  @UseGuards(JwtGuard)
  @Get('debug-user')
  async debugUser(@Request() req) {
    return { user: req.user.ID }; // Returns the user object as response for easy testing
  }

  @Post()
  @Header('content-type', 'application/json')
  async create(@Body() boody, @Request() req) {
    return this.postServices.create(boody, req.user.ID);
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

  @Put(':id')
  updatePost(@Param('id') id, @Body() updatedField) {
    return this.postServices.UpdatePost(id, updatedField);
  }
}

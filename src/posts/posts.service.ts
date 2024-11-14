import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Posts } from './entities/post.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(private readonly dataSource: DataSource) {}
  PostRepo = this.dataSource.getRepository(Posts);

  async create(boody, id) {
    const post = new Posts();
    const { content, title } = boody;

    if (!content || !title || !id) {
      throw new HttpException(
        'content and titl and author are both required !',
        HttpStatus.BAD_REQUEST,
      );
    }
    post.content = content;
    post.title = title;
    post.autor = id;
    await this.PostRepo.save(post);

    return {
      Posts: await this.PostRepo.find(),
    };
  }

  async getPosts() {
    return {
      Posts: await this.PostRepo.find(),
    };
  }

  async getPost(postID) {
    const desired_Post = await this.PostRepo.findOne({ where: { id: postID } });
    return {
      post: desired_Post,
    };
  }

  async deletePost(PostID) {
    await this.PostRepo.delete(PostID);

    return {
      Posts: await this.PostRepo.find(),
    };
  }

  async UpdatePost(id: number, updatedFields: Partial<Posts>) {
    // Check if `updatedFields` contains any properties
    if (!updatedFields || Object.keys(updatedFields).length === 0) {
      throw new Error('No update values provided');
    }

    await this.PostRepo.update(id, updatedFields);

    return {
      message: 'Article updated successfully',
      post: await this.PostRepo.findOne({ where: { id: id } }),
    };
  }
}

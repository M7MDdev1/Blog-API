import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Posts } from './entities/post.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(private readonly dataSource: DataSource) {}
  PostRepo = this.dataSource.getRepository(Posts);

  async create(boody) {
    const post = new Posts();
    const { body, title } = boody;

    if (!body || !title) {
      throw new HttpException(
        'Body and title are both required !',
        HttpStatus.BAD_REQUEST,
      );
    }
    post.body = body;
    post.title = title;

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
    if (!desired_Post) {
      throw new HttpException("Post doesn't exsists", HttpStatus.NOT_FOUND);
    }
    return {
      post: desired_Post,
    };
  }

  async deletePost(PostID) {
    const desired_Post = await this.PostRepo.delete(PostID);
    if (desired_Post.affected == 0) {
      throw new HttpException("Post doesn't exsists", HttpStatus.NOT_FOUND);
    }
    return {
      Posts: await this.PostRepo.find(),
    };
  }
}

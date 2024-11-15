import { Posts } from 'src/posts/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Posts, (Posts) => Posts.id)
  post: Posts;

  @ManyToOne(() => Posts, (Posts) => Posts.id)
  user: User;

  @Column()
  content: string;
}

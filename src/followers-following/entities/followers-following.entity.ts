import { User } from 'src/user/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('followers_following')
export class FollowersFollowing {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (User) => User.id)
  follower: User;

  @ManyToOne(() => User, (User) => User.id)
  followed: User;
}

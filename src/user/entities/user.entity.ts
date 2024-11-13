import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;
}

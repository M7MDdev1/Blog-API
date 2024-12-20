import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Posts')
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  autor: string;
}

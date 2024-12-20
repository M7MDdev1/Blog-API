import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email: email });
  }

  findByID(id: number) {
    return this.usersRepository.findOneBy({ ID: id });
  }

  create(user: User) {
    return this.usersRepository.save(user);
  }
}

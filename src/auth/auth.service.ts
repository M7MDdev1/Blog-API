import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async Validation(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException("User dosn't exist");
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException('Wrong password !');
    }
    return user;
  }

  async login(user) {
    return {
      JWT: this.jwtService.sign({ email: user.email, password: user.password }),
    };
  }

  async register(user) {
    if (await this.userService.findByEmail(user.email)) {
      throw new BadRequestException('User exist !');
    }
    const newUser = { ...user, password: await bcrypt.hash(user.password, 10) };
    await this.userService.create(newUser);
    return this.login(newUser); //Automatic Login !
  }
}

import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Public } from './decorators/public.decorator';
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  HelloWorlding() {
    return 'Hello World';
  }
  @UseGuards(AuthGuard('local'))
  @Public()
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('register')
  async register(@Body() registerBody) {
    return await this.authService.register(registerBody);
  }

  @UseGuards(JwtGuard)
  @Get('debug-user')
  async debugUser(@Request() req) {
    return { user: req.user.ID }; // Returns the user object as response for easy testing
  }
}

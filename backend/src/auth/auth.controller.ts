import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: { user: User }) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto.email, registerDto.password);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: Request) {
    return req.user;
  }
}

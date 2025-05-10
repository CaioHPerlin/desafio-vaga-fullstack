import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return req.user;
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto.email, registerDto.password);
  }
}

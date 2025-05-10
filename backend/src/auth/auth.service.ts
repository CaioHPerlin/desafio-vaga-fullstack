import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from 'src/auth/dto/login-response.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<LoginResponseDto> {
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException();

    const payload = { email: user.email, sub: user.id };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      email: user.email,
      id: user.id,
    };
  }

  async register(email: string, password: string) {
    return this.usersService.create(email, password);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}

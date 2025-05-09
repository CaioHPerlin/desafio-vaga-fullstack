import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthResultDto } from 'src/auth/dto/auth-result.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthResultDto> {
    const user = await this.usersService.validate(email, password);
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
}

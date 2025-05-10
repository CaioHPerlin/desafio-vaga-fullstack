import { ProfileResponseDto } from 'src/auth/dto/profile-response.dto';

declare module 'express' {
  interface Request {
    user: ProfileResponseDto;
  }
}

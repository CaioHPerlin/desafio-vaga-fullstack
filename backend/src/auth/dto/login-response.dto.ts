import { ApiResponseProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiResponseProperty()
  accessToken: string;

  @ApiResponseProperty()
  id: number;

  @ApiResponseProperty()
  email: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class ProfileResponseDto {
  @ApiProperty({
    description: 'The email address of the authenticated user',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The user ID (subject of the token)',
    example: 1,
  })
  sub: number;

  @ApiProperty({
    description: 'Issued at timestamp (when the token was generated)',
    example: 1683705600,
  })
  iat: number;

  @ApiProperty({
    description: 'Expiration timestamp (when the token will expire)',
    example: 1683712800,
  })
  exp: number;
}

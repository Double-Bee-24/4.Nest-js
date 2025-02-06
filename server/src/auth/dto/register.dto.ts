import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Username, should be unique',
    example: 'Walter White',
  })
  username?: string;

  @ApiProperty({
    description: 'Here should be a strong password',
    example: 'NeverBeHacked123',
  })
  password?: string;
}

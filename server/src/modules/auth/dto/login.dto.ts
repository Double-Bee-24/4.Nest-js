import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'Walter White', description: 'Username' })
  username: string = '';

  @ApiProperty({ example: 'NeverBeHacked123', description: 'Password' })
  password: string = '';
}

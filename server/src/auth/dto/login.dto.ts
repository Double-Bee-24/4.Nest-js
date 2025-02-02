import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'Walter', description: 'Username' })
  username: string = '';

  @ApiProperty({ example: 'supahard', description: 'Password' })
  password: string = '';
}

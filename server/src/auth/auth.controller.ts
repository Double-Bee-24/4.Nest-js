import { AuthService } from './auth.service';
import { Controller, Req, Post, UseGuards, Get, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Users } from 'src/users/entities/users.entity';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

interface CustomRequest extends Request {
  user: Users;
  logout: () => void;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginDto })
  login(@Req() req: CustomRequest) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get authenticated user profile' })
  getAuthStatus(@Req() req: CustomRequest) {
    return req.user;
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}

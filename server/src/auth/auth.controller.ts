import { AuthService } from './auth.service';
import { Controller, Req, Post, UseGuards, Get, Body } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Users } from 'src/users/entities/users.entity';
import { LoginDto } from './dto/login.dto';
import { AuthenticatedGuard, LocalAuthGuard } from './utils/local-auth.guard';
import { Request } from 'express';
import { RegisterDto } from './dto/register.dto';

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
    return req.user;
  }

  @Post('logout')
  logout(@Req() req: CustomRequest) {
    req.logout();
  }

  @UseGuards(AuthenticatedGuard)
  @Get('status')
  getAuthStatus(@Req() req: CustomRequest) {
    return req.user;
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}

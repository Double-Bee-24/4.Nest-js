import { AuthService } from './auth.service';
import {
  Controller,
  Req,
  Post,
  UseGuards,
  Get,
  Body,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Users } from 'src/users/entities/users.entity';
import { LoginDto } from './dto/login.dto';
import { AuthenticatedGuard, LocalAuthGuard } from './utils/local-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { Request, Response } from 'express';

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
  login(@Req() _req: CustomRequest) {
    // return req.user;
  }

  @Post('logout')
  logout(@Req() _req: Request, @Res() _res: Response) {
    // this.authService.logout(req, res);
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

import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get,Request } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username);
  }

@HttpCode(HttpStatus.OK)
@Post('logout')
logout(@Body() logoutDto: Record<string, any>) {
    return this.authService.logout(logoutDto.username);
}

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
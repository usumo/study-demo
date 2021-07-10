import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/dto/login.dto';
import { AuthService } from './auth.service';

@ApiTags('用户操作')
@Controller('/api/auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '登录' })
  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Body() user: LoginDto) {
    // const isExist = await this.authService.validateUser(user.username, user.password);
    // if (!isExist) {
    //   return {
    //     code: 1,
    //     msg: '用户名或密码错误'
    //   }
    // }
    return this.authService.login(user);
  }

  @ApiOperation({ summary: '登出' })
  // @ApiHeader({ description: '登录后返回的access_token', name: 'Authorization', required: true })
  @ApiBearerAuth('Authorization')
  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  logout(@Request() req) {
    return req.user;
  }
}
import {
  Body,
  Controller,
  ClassSerializerInterceptor,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { UpdatePasswordDto } from './users.user.dto';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UseGuards(JwtAuthGuard)
  // @ApiSecurity('access-key')
  // @UseInterceptors(ClassSerializerInterceptor)
  // @Get('me')
  // public me(@Request() req) {
  //   return new RenderUser(req.user);
  // }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('get-user')
  public async getUser(@Request() req) {
    const user = await this.usersService.getUser(req.user.id);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Put('update-password')
  public async updatePassword(
    @Request() req,
    @Body()
    updatePasswordDto: UpdatePasswordDto,
  ) {
    await this.usersService.updatePassword(updatePasswordDto, req.user.id);
    return {
      message: 'password_update_success',
    };
  }
}

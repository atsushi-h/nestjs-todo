import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiCookieAuth,
  ApiHeader,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'ログインユーザー情報を取得' })
  @ApiCookieAuth('access_token')
  @ApiHeader({
    name: 'csrf-token',
    description: 'CSRF protection token',
    required: true,
    example: 'your-csrf-token-value',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    content: {
      'application/json': {
        example: {
          id: 3,
          createdAt: '2025-02-15T04:01:31.980Z',
          updatedAt: '2025-02-15T04:01:31.980Z',
          email: 'test@gmail.com',
          nickName: 'test',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Error: Unauthorized',
    content: {
      'application/json': {
        example: { statusCode: 401, message: 'Unauthorized' },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Error: Invalid CSRF Token',
    content: {
      'application/json': {
        example: { statusCode: 403, message: 'invalid csrf token' },
      },
    },
  })
  getLoginUser(@Req() req: Request): Omit<User, 'hashedPassword'> {
    return req.user;
  }

  @Patch()
  @ApiOperation({ summary: 'ログインユーザー情報を編集' })
  @ApiCookieAuth('access_token')
  @ApiHeader({
    name: 'csrf-token',
    description: 'CSRF protection token',
    required: true,
    example: 'your-csrf-token-value',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: { nickName: { type: 'string', default: 'test' } },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    content: {
      'application/json': {
        example: {
          id: 3,
          createdAt: '2025-02-15T04:01:31.980Z',
          updatedAt: '2025-02-15T04:01:31.980Z',
          email: 'test@gmail.com',
          nickName: 'test',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Error: Unauthorized',
    content: {
      'application/json': {
        example: { statusCode: 401, message: 'Unauthorized' },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Error: Invalid CSRF Token',
    content: {
      'application/json': {
        example: { statusCode: 403, message: 'invalid csrf token' },
      },
    },
  })
  updateUser(
    @Req() req: Request,
    @Body() dto: UpdateUserDto,
  ): Promise<Omit<User, 'hashedPassword'>> {
    return this.userService.updateUser(req.user.id, dto);
  }
}

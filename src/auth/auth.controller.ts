import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  Get,
} from '@nestjs/common';
import { ApiOperation, ApiHeader, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Csrf, Msg } from './interfaces/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/csrf')
  @ApiOperation({ summary: 'CSRFトークン取得' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    content: {
      'application/json': {
        example: { csrfToken: 'aJ3DLzgV-QWITjx8K6VCPLruLY3TSKPLKQj0' },
      },
    },
  })
  getCsrfToken(@Req() req: Request): Csrf {
    return { csrfToken: req.csrfToken() };
  }

  @Post('signup')
  @ApiOperation({ summary: 'サインアップ' })
  @ApiHeader({
    name: 'csrf-token',
    description: 'CSRF protection token',
    required: true,
    example: 'your-csrf-token-value',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', default: 'test@gmail.com' },
        password: { type: 'string', default: 'password' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Success',
    content: { 'application/json': { example: { message: 'ok' } } },
  })
  @ApiResponse({
    status: 403,
    description: 'Error: This email is already taken',
    content: {
      'application/json': {
        example: {
          message: 'This email is already taken',
          error: 'Forbidden',
          statusCode: 403,
        },
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
  signUp(@Body() dto: AuthDto): Promise<Msg> {
    return this.authService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK) // デフォルトだと201になるので200に変更する
  @Post('login')
  @ApiOperation({ summary: 'ログイン' })
  @ApiHeader({
    name: 'csrf-token',
    description: 'CSRF protection token',
    required: true,
    example: 'your-csrf-token-value',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', default: 'test@gmail.com' },
        password: { type: 'string', default: 'password' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    content: { 'application/json': { example: { message: 'ok' } } },
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
  async login(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Msg> {
    const jwt = await this.authService.login(dto);
    res.cookie('access_token', jwt.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    return { message: 'ok' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('/logout')
  @ApiOperation({ summary: 'ログアウト' })
  @ApiHeader({
    name: 'csrf-token',
    description: 'CSRF protection token',
    required: true,
    example: 'your-csrf-token-value',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    content: { 'application/json': { example: { message: 'ok' } } },
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
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response): Msg {
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    return { message: 'ok' };
  }
}

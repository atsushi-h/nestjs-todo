import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiCookieAuth,
  ApiHeader,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { TodoService } from './todo.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';

@UseGuards(AuthGuard('jwt'))
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: 'Todo一覧を取得' })
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
        example: [
          {
            id: 10,
            createdAt: '2025-02-15T08:13:27.384Z',
            updatedAt: '2025-02-15T08:13:27.384Z',
            title: 'test2',
            description: 'description test2',
            userId: 3,
          },
          {
            id: 9,
            createdAt: '2025-02-15T08:09:36.538Z',
            updatedAt: '2025-02-15T08:11:22.175Z',
            title: 'test12',
            description: 'description test12',
            userId: 3,
          },
        ],
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
  getTasks(@Req() req: Request): Promise<Task[]> {
    return this.todoService.getTasks(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Todoを取得' })
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
          id: 9,
          createdAt: '2025-02-15T08:09:36.538Z',
          updatedAt: '2025-02-15T08:09:36.538Z',
          title: 'test',
          description: 'description test',
          userId: 3,
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
  getTaskById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) taskId: number,
  ): Promise<Task> {
    return this.todoService.getTaskById(req.user.id, taskId);
  }

  @Post()
  @ApiOperation({ summary: 'Todoを追加' })
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
      properties: {
        title: { type: 'string', default: 'test' },
        description: { type: 'string', default: 'description test' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Success',
    content: {
      'application/json': {
        example: {
          id: 9,
          createdAt: '2025-02-15T08:09:36.538Z',
          updatedAt: '2025-02-15T08:09:36.538Z',
          title: 'test',
          description: 'description test',
          userId: 3,
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
  createTask(@Req() req: Request, @Body() dto: CreateTaskDto): Promise<Task> {
    return this.todoService.createTask(req.user.id, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Todoを編集' })
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
      properties: {
        title: { type: 'string', default: 'test' },
        description: { type: 'string', default: 'description test' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    content: {
      'application/json': {
        example: {
          id: 9,
          createdAt: '2025-02-15T08:09:36.538Z',
          updatedAt: '2025-02-15T08:09:36.538Z',
          title: 'test',
          description: 'description test',
          userId: 3,
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
  updateTaskById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) taskId: number,
    @Body() dto: UpdateTaskDto,
  ): Promise<Task> {
    return this.todoService.updateTaskById(req.user.id, taskId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOperation({ summary: 'Todoを削除' })
  @ApiCookieAuth('access_token')
  @ApiHeader({
    name: 'csrf-token',
    description: 'CSRF protection token',
    required: true,
    example: 'your-csrf-token-value',
  })
  @ApiResponse({ status: 204, description: 'Success' })
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
  deleteTaskById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) taskId: number,
  ): Promise<void> {
    return this.todoService.deleteTaskById(req.user.id, taskId);
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: 'Todoのタイトル', type: String })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Todoの内容', type: String })
  @IsString()
  @IsOptional()
  description?: string;
}

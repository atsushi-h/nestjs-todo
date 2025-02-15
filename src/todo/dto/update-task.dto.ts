import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({ description: 'Todoのタイトル', type: String })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Todoの内容', type: String })
  @IsString()
  @IsOptional()
  description?: string;
}

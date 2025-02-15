import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'ニックネーム', type: String })
  @IsString()
  @IsOptional()
  nickName?: string;
}

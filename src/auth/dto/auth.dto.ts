import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @ApiProperty({ description: 'メールアドレス', type: String })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'パスワード', type: String })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}

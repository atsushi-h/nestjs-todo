import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private readonly config: ConfigService) {
    if (process.env.GENERATE_SWAGGER_YAML === 'true') {
      // CIのyamlファイル生成時はDBに接続しない
      return;
    }
    super({ datasources: { db: { url: config.get('DATABASE_URL') } } });
  }
}

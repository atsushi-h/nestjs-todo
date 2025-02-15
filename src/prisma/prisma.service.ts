import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private readonly config: ConfigService) {
    // CI環境（swagger.yaml生成時）はDBに接続しない
    const isSwaggerGeneration = process.env.GENERATE_SWAGGER_YAML === 'true';

    super(
      isSwaggerGeneration
        ? {} // DB接続をスキップする
        : { datasources: { db: { url: config.get<string>('DATABASE_URL') } } },
    );
  }
}

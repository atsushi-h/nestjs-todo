import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Request } from 'express';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // DTO、バリデーションの設定
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // CORS
  app.enableCors({ credentials: true, origin: ['http://localhost:3000'] });

  // cookie
  app.use(cookieParser());

  // csurf
  app.use(
    csurf({
      cookie: { httpOnly: true, secure: true },
      value: (req: Request) => req.header('csrf-token'),
    }),
  );

  // Swagger 設定
  const config = new DocumentBuilder()
    .setTitle('Todo API Document')
    .setDescription('Todo API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  if (process.env.GENERATE_SWAGGER_YAML === 'true') {
    // CI時はyamlファイルに出力
    const yamlData = yaml.dump(document);
    fs.writeFileSync(
      path.join(__dirname, '..', 'docs', 'swagger.yaml'),
      yamlData,
      'utf8',
    );

    process.exit(0);
  } else {
    // ローカル環境では Swagger UI を起動
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(process.env.PORT || 3005);
}

bootstrap();

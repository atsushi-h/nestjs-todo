import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Request } from 'express';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';

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
      value: (req: Request) => {
        return req.header('csrf-token');
      },
    }),
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Test API Project')
    .setDescription('Test API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3005);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import compression from 'compression';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { SwaggerModule } from '@nestjs/swagger';
import { DocumentBuilder } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import type { Express } from 'express';
import express from 'express';

let cachedApp: Express;

async function createApp(): Promise<Express> {
  if (cachedApp) {
    return cachedApp;
  }

  const expressApp = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
    {
      logger: new ConsoleLogger({
        prefix: 'ASSIGNMENT',
      }),
    },
  );

  app.use(helmet());
  app.enableCors();
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('ASSIGNMENT')
    .setDescription('ASSIGNMENT API description')
    .setVersion('1.0')
    .addTag('ASSIGNMENT')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.init();
  cachedApp = expressApp;
  return expressApp;
}

export default async function handler(
  req: express.Request,
  res: express.Response,
) {
  const app = await createApp();
  app(req, res);
}

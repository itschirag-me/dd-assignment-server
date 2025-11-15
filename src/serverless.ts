import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import helmet from 'helmet';
import compression from 'compression';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { SwaggerModule } from '@nestjs/swagger';
import { DocumentBuilder } from '@nestjs/swagger';
import express from 'express';

let cachedApp: express.Application;

async function createApp(): Promise<express.Application> {
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
  return app(req, res) as unknown as void;
}

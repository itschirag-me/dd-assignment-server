import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import compression from 'compression';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'ASSIGNMENT',
    }),
  });

  app.use(helmet());
  app.enableCors();
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('ASSIGNMENT')
    .setDescription('ASSIGNMENT API description')
    .setVersion('1.0')
    .addTag('ASSIGNMENT')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();

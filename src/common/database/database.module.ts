import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Env } from '../../app.config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>(Env.MONGODB_URI),
        dbName: configService.get<string>(Env.MONGODB_NAME),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}

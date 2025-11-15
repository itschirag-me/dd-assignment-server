import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandDocument, BrandSchema } from './schemas/brand.schema';
import { BrandRepository } from './brand.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BrandDocument.name, schema: BrandSchema },
    ]),
  ],
  controllers: [BrandController],
  providers: [BrandService, BrandRepository],
  exports: [BrandRepository],
})
export class BrandModule {}

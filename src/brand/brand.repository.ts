import { Model } from 'mongoose';
import { BrandDocument } from './schemas/brand.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '../common';

@Injectable()
export class BrandRepository extends AbstractRepository<BrandDocument> {
  protected readonly logger = new Logger(BrandRepository.name);

  constructor(
    @InjectModel(BrandDocument.name)
    private readonly brandModel: Model<BrandDocument>,
  ) {
    super(brandModel);
  }
}

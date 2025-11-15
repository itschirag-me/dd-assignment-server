import { Model, FilterQuery } from 'mongoose';
import { BrandDocument } from './schemas/brand.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '../common';

@Injectable()
export class BrandRepository extends AbstractRepository<BrandDocument> {
  protected readonly logger = new Logger(BrandRepository.name);

  constructor(
    @InjectModel(BrandDocument.name)
    brandModel: Model<BrandDocument>,
  ) {
    super(brandModel);
  }

  async findOneWithoutException(
    filterQuery: FilterQuery<BrandDocument>,
  ): Promise<BrandDocument | null> {
    const document = await (this as any).model.findOne(filterQuery).lean(true);
    return (document as BrandDocument | null) || null;
  }
}

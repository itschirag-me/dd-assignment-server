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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const document = await (this as any).model
      .findOne(filterQuery)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .lean(true);
    return (document as BrandDocument | null) || null;
  }

  async upsert(
    filterQuery: FilterQuery<BrandDocument>,
    document: Partial<BrandDocument>,
  ): Promise<BrandDocument> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const result = await (this as any).model
      .findOneAndUpdate(filterQuery, document, {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .lean(true);
    return result as BrandDocument;
  }
}

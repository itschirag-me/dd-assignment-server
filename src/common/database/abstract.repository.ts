import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';

export abstract class AbstractRepository<TDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Partial<TDocument>): Promise<TDocument> {
    const createdDocument = new this.model(document);
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model
      .findOne(filterQuery)
      .lean<TDocument>(true);
    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found');
    }
    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    document: Partial<TDocument>,
  ): Promise<TDocument> {
    const updatedDocument = await this.model
      .findOneAndUpdate(filterQuery, document, { new: true })
      .lean<TDocument>(true);
    if (!updatedDocument) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found');
    }
    return updatedDocument;
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    return this.model.find(filterQuery).lean<TDocument[]>(true);
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    const deletedDocument = await this.model
      .findOneAndDelete(filterQuery)
      .lean<TDocument>(true);
    if (!deletedDocument) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found');
    }
    return deletedDocument;
  }

  async exists(filterQuery: FilterQuery<TDocument>): Promise<boolean> {
    const document = await this.model.exists(filterQuery);
    return !!document;
  }

  count(): Promise<number> {
    return this.model.countDocuments();
  }
}

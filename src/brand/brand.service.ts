import { Injectable } from '@nestjs/common';
import { BrandRepository } from './brand.repository';
import { CreateBrandDto } from './dto/create-brand.dto';
import { BrandDocument } from './schemas/brand.schema';
import { FilterQuery } from 'mongoose';
import { UpdateBrandDto } from './dto/update-brand.dto';
import insightData from '../data/mock_insights.json';
import { InsightDocument } from './interfaces/insight.interface';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) {}

  async create(createBrandDto: CreateBrandDto) {
    // Check if brand exists by name, website, or email
    const existingBrand = await this.brandRepository.findOneWithoutException({
      $or: [
        { name: createBrandDto.name },
        { website: createBrandDto.website },
        { email: createBrandDto.email },
      ],
    });

    if (existingBrand && existingBrand._id) {
      // Upsert: update existing brand but preserve insightId
      const updateData: Partial<BrandDocument> = {
        ...createBrandDto,
        insightId: existingBrand.insightId, // Preserve existing insightId
      };

      return this.brandRepository.findOneAndUpdate(
        { _id: existingBrand._id },
        updateData,
      );
    }

    // Create new brand
    const countOfBrands = await this.brandRepository.count();
    const MAX_BRANDS = 200;

    const newBrand = {
      ...createBrandDto,
      insightId: (countOfBrands % MAX_BRANDS) + 1,
    };

    return this.brandRepository.create(newBrand);
  }

  async find(filterQuery: FilterQuery<BrandDocument>) {
    return this.brandRepository.find(filterQuery);
  }

  async findOne(id: string) {
    return this.brandRepository.findOne({ _id: id });
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    return this.brandRepository.findOneAndUpdate({ _id: id }, updateBrandDto);
  }

  async remove(id: string) {
    return this.brandRepository.findOneAndDelete({
      _id: id,
    });
  }

  async getInsight(id: string) {
    const brand = await this.brandRepository.findOne({ _id: id });
    return insightData[brand.insightId] as InsightDocument;
  }
}

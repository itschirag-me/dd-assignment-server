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

    // Prepare update data
    const updateData: Partial<BrandDocument> = {
      ...createBrandDto,
    };

    // If brand exists, preserve the insightId
    if (existingBrand && existingBrand.insightId) {
      updateData.insightId = existingBrand.insightId;
    } else {
      // For new brands, calculate insightId
      const countOfBrands = await this.brandRepository.count();
      const MAX_BRANDS = 200;
      updateData.insightId = (countOfBrands % MAX_BRANDS) + 1;
    }

    // Use upsert to handle both create and update cases
    // This prevents duplicate key errors by updating if any of name/website/email match
    return this.brandRepository.upsert(
      {
        $or: [
          { name: createBrandDto.name },
          { website: createBrandDto.website },
          { email: createBrandDto.email },
        ],
      },
      updateData,
    );
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

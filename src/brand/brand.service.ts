import { BadRequestException, Injectable } from '@nestjs/common';
import { BrandRepository } from './brand.repository';
import { CreateBrandDto } from './dto/create-brand.dto';
import { BrandDocument } from './schemas/brand.schema';
import { FilterQuery, Types } from 'mongoose';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) {}

  async create(createBrandDto: CreateBrandDto) {
    const brand = await this.brandRepository.exists({
      email: createBrandDto.email,
    });

    const website = await this.brandRepository.exists({
      website: createBrandDto.website,
    });

    const email = await this.brandRepository.exists({
      email: createBrandDto.email,
    });

    if (brand || website || email)
      throw new BadRequestException('Brand already exists');
    return this.brandRepository.create(createBrandDto);
  }

  async find(filterQuery: FilterQuery<BrandDocument>) {
    return this.brandRepository.find(filterQuery);
  }

  async findOne(id: string) {
    return this.brandRepository.findOne({ _id: new Types.ObjectId(id) });
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    return this.brandRepository.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      updateBrandDto,
    );
  }

  async remove(id: string) {
    return this.brandRepository.findOneAndDelete({
      _id: new Types.ObjectId(id),
    });
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BrandDocument } from './schemas/brand.schema';
import { InsightResponseDto } from './dto/insight-response.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @ApiOperation({ summary: 'Create or update a brand' })
  @ApiResponse({
    status: 201,
    description: 'The brand has been successfully created or updated.',
    type: BrandDocument,
  })
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all brands' })
  @ApiResponse({
    status: 200,
    description: 'The brands have been successfully retrieved.',
    type: [BrandDocument],
  })
  findAll() {
    return this.brandService.find({});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a brand by id' })
  @ApiResponse({
    status: 200,
    description: 'The brand has been successfully retrieved.',
    type: BrandDocument,
  })
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a brand by id' })
  @ApiResponse({
    status: 200,
    description: 'The brand has been successfully updated.',
    type: BrandDocument,
  })
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(id, updateBrandDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a brand by id' })
  @ApiResponse({
    status: 200,
    description: 'The brand has been successfully deleted.',
    type: BrandDocument,
  })
  remove(@Param('id') id: string) {
    return this.brandService.remove(id);
  }

  @Get(':id/insight')
  @ApiOperation({ summary: 'Get insight of a brand by id' })
  @ApiResponse({
    status: 200,
    description: 'The insight of the brand has been successfully retrieved.',
    type: InsightResponseDto,
  })
  getInsight(@Param('id') id: string) {
    return this.brandService.getInsight(id);
  }
}

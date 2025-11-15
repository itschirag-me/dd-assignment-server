import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { LoginBrandDto } from './dto/login-brand.dto';
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BrandDocument } from './schemas/brand.schema';
import { InsightResponseDto } from './dto/insight-response.dto';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';
import { CurrentBrand } from '../auth/decorators/current-brand.decorator';

@Controller('brand')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BrandController {
  constructor(
    private readonly brandService: BrandService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @Public()
  @ApiOperation({ summary: 'Login and get JWT token' })
  @ApiResponse({
    status: 200,
    description: 'Login successful, returns JWT token.',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials.',
  })
  login(@Body() loginBrandDto: LoginBrandDto) {
    return this.authService.login(loginBrandDto);
  }

  @Post()
  @Public()
  @ApiOperation({ summary: 'Create a new brand' })
  @ApiResponse({
    status: 201,
    description: 'The brand has been successfully created.',
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

  @Get('me')
  @ApiOperation({ summary: 'Get current authenticated brand' })
  @ApiResponse({
    status: 200,
    description: 'The brand has been successfully retrieved.',
    type: BrandDocument,
  })
  findOne(@CurrentBrand() currentBrand: BrandDocument) {
    return currentBrand;
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update current authenticated brand' })
  @ApiResponse({
    status: 200,
    description: 'The brand has been successfully updated.',
    type: BrandDocument,
  })
  update(
    @CurrentBrand() currentBrand: BrandDocument,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    if (!currentBrand._id) {
      throw new InternalServerErrorException('Brand ID not found');
    }
    return this.brandService.update(
      currentBrand._id.toString(),
      updateBrandDto,
    );
  }

  @Delete('me')
  @ApiOperation({ summary: 'Delete current authenticated brand' })
  @ApiResponse({
    status: 200,
    description: 'The brand has been successfully deleted.',
    type: BrandDocument,
  })
  remove(@CurrentBrand() currentBrand: BrandDocument) {
    if (!currentBrand._id) {
      throw new InternalServerErrorException('Brand ID not found');
    }
    return this.brandService.remove(currentBrand._id.toString());
  }

  @Get('me/insight')
  @ApiOperation({ summary: 'Get insight of current authenticated brand' })
  @ApiResponse({
    status: 200,
    description: 'The insight of the brand has been successfully retrieved.',
    type: InsightResponseDto,
  })
  getInsight(@CurrentBrand() currentBrand: BrandDocument) {
    if (!currentBrand._id) {
      throw new InternalServerErrorException('Brand ID not found');
    }
    return this.brandService.getInsight(currentBrand._id.toString());
  }
}

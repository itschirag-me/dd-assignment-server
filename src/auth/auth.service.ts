import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BrandRepository } from '../brand/brand.repository';
import { LoginBrandDto } from '../brand/dto/login-brand.dto';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly brandRepository: BrandRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginBrandDto: LoginBrandDto) {
    const brand = await this.brandRepository.findOne({
      email: loginBrandDto.email,
    });

    if (!brand) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginBrandDto.password,
      brand.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!brand._id) {
      throw new UnauthorizedException('Invalid brand data');
    }

    const payload: JwtPayload = {
      sub: brand._id.toString(),
      email: brand.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
      brand: {
        id: brand._id,
        name: brand.name,
        email: brand.email,
        website: brand.website,
      },
    };
  }
}

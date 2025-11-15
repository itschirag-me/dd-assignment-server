import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { BrandRepository } from '../brand/brand.repository';
import { BrandDocument } from '../brand/schemas/brand.schema';

export interface JwtPayload {
  sub: string; // brand id
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly brandRepository: BrandRepository,
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayload): Promise<BrandDocument> {
    const brand = await this.brandRepository.findOne({ _id: payload.sub });
    if (!brand) {
      throw new UnauthorizedException('Brand not found');
    }
    return brand;
  }
}

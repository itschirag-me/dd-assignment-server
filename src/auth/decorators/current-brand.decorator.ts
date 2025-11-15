import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { BrandDocument } from '../../brand/schemas/brand.schema';

export const CurrentBrand = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): BrandDocument => {
    const request = ctx.switchToHttp().getRequest<{ user: BrandDocument }>();
    return request.user;
  },
);

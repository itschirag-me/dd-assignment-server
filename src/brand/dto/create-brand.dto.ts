import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsUrl,
} from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({
    description: 'The name of the brand',
    example: 'Brand Name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The website of the brand',
    example: 'https://www.example-brand.com',
  })
  @IsUrl()
  @IsNotEmpty()
  website: string;

  @ApiProperty({
    description: 'The email of the brand',
    example: 'brand@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password of the brand',
    example: 'password',
  })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  })
  @IsNotEmpty()
  password: string;
}

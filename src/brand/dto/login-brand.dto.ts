import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginBrandDto {
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
  @IsString()
  @IsNotEmpty()
  password: string;
}

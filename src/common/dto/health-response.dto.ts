import { ApiProperty } from '@nestjs/swagger';

export class HealthResponseDto {
  @ApiProperty({
    description: 'The status of the application',
    example: 'OK',
  })
  status: string;

  @ApiProperty({
    description: 'The uptime of the application in seconds',
    example: 1234.56,
  })
  uptime: number;
}

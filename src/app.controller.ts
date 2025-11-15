import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthResponseDto } from './common/dto/health-response.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get health of the application' })
  @ApiResponse({
    status: 200,
    description:
      'The health of the application has been successfully retrieved.',
    type: HealthResponseDto,
  })
  getHealth() {
    return this.appService.getHealth();
  }
}

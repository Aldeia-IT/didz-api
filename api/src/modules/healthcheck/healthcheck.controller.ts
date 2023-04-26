import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';

@Controller('healthcheck')
export class HealthcheckController {
  @Get('/')
  @ApiOperation({ summary: 'Check the status of the API' })
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  healthCheck() {
    return { status: 'ok' };
  }
}

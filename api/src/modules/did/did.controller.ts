import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Decentralized Identifiers')
@Controller('did')
export class DidController {
  @Get('/')
  async getDids() {
    return ['did1', 'did2', 'did3'];
  }

  @Get('/:did')
  async getDid() {
    return 'did1';
  }

  @Delete('/:did')
  async deleteDid() {
    return 'did1 deleted';
  }

  @Post('/create')
  async createDid() {
    return 'did1 created';
  }

  @Post('/resolve')
  async resolveDid() {
    return 'did1 resolved';
  }

  @Put('/update')
  async updateDid() {
    return 'did1 updated';
  }
}

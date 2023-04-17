import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DidService } from './did.service';

@ApiTags('Decentralized Identifiers')
@Controller('did')
export class DidController {
  constructor(private didService: DidService) {}
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
    this.didService.createDid('test');
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

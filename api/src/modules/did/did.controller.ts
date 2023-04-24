import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DidAuthGuard } from '../../guards/didauth.guard';
import { CreateDidDto } from './dtos/payload/create-did.dto';
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
  @UseGuards(DidAuthGuard)
  async createDid(@Body() createDidDto: CreateDidDto) {
    return this.didService.createDid(createDidDto);
  }

  @Get('/resolve/:did')
  async resolveDid(@Param('did') did: string) {
    return this.didService.retrieveDid(did);
  }

  @Put('/update')
  @UseGuards(DidAuthGuard)
  async updateDid() {
    return 'did1 updated';
  }
}

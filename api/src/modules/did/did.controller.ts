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
import { ApiBody, ApiNoContentResponse, ApiTags } from '@nestjs/swagger';
import { DidAuthGuard } from '../../guards/didauth.guard';
import { CreateDidDto } from './dtos/payload/create-did.dto';
import { DidService } from './did.service';
import { ApiParam } from '@nestjs/swagger';

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
  @ApiNoContentResponse({
    description: 'Create a DID and DID Document based in a schema',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        type: {
          description: 'project | creditBatch',
          type: 'string',
        },
        schemaUrl: {
          description:
            'url to the schema. Ex. https://raw.githubusercontent.com/Aldeia-IT/didz-schema/main/credit-batches/0.1/credit-batch.schema.json',
          type: 'string',
        },
        project: {
          description:
            'Project DID reference. Ex. did:ebf:80f81fbf42d7d4922eb700ae460948fdd96b20c3b52e4cd66ce06a3967fc8590',
          type: 'string',
        },
      },
    },
  })
  async createDid(@Body() createDidDto: CreateDidDto) {
    return this.didService.createDid(createDidDto);
  }

  @Get('/resolve/:did')
  @ApiNoContentResponse({
    description: 'Retriving DID Document from a DID Address',
  })
  @ApiParam({
    name: 'did',
    description: 'DID Address',
    required: true,
  })
  async resolveDid(@Param('did') did: string) {
    return this.didService.retrieveDid(did);
  }

  @Put('/update')
  @UseGuards(DidAuthGuard)
  async updateDid() {
    return 'did1 updated';
  }
}

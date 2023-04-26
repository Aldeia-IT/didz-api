import { Body, Controller, Get, Post, UseGuards, Param } from '@nestjs/common';
import {
  ApiBody,
  ApiTags,
  ApiOperation,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiSecurity,
} from '@nestjs/swagger';
import { DidAuthGuard } from '../../guards/didauth.guard';
import { CreateDidDto } from './dtos/payload/create-did.dto';
import { DidService } from './did.service';
import { ApiParam } from '@nestjs/swagger';

@ApiTags('Decentralized Identifiers')
@Controller('did')
export class DidController {
  constructor(private didService: DidService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create a DID and DID Document based in a schema' })
  @UseGuards(DidAuthGuard)
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiSecurity('x-did-key')
  async createDid(@Body() createDidDto: CreateDidDto) {
    return this.didService.createDid(createDidDto);
  }

  @Get('/resolve/:did')
  @ApiOperation({ summary: 'Retriving DID Document from a DID Address' })
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiParam({
    name: 'did',
    description: 'DID Address',
    required: true,
  })
  async resolveDid(@Param('did') did: string) {
    return this.didService.retrieveDid(did);
  }
}

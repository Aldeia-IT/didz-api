import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DidAuthGuard } from '../../guards/didauth.guard';
import { CreateDidDto } from './dtos/payload/create-did.dto';
import { generateEd25519KeyPair } from '../../common/crypto-utils';
import * as bs58 from 'bs58';
import Ajv from 'ajv';
import axios from 'axios';

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
  @UseGuards(DidAuthGuard)
  async createDid(@Body() createDidDto: CreateDidDto) {
    const didMethod = 'example';
    const did = `did:${didMethod}:${createDidDto.address}`;
    const didController = process.env.ADMIN_DID_CONTROLLER_ADDRESS;

    const keyPair = generateEd25519KeyPair(didController);
    const publicKeyMultibase = `z${bs58
      .encode(Buffer.from(keyPair.publicKey))
      .toString()}`;

    const didDocument = {
      '@context': [
        'https://www.w3.org/ns/did/v1',
        'https://w3id.org/security/suites/ed25519-2020/v1',
      ],
      id: did,
      controller: didController,
      verificationMethod: [
        {
          id: `${did}#keys-1`,
          type: 'Ed25519VerificationKey2020',
          controller: didController,
          publicKeyMultibase: publicKeyMultibase,
        },
      ],
      authentication: [`${did}#keys-1`],
    };

    didDocument[createDidDto.type] = JSON.parse(createDidDto.data);
    console.log(didDocument);

    const ajv = new Ajv();
    const sch = await axios.get(createDidDto.schemaUrl);
    const validate = ajv.compile(sch.data);

    if (!validate(didDocument)) {
      throw new Error(validate.errors.join(' '));
    }

    return didDocument;
  }

  @Post('/resolve')
  async resolveDid() {
    return 'did1 resolved';
  }

  @Put('/update')
  @UseGuards(DidAuthGuard)
  async updateDid() {
    return 'did1 updated';
  }
}

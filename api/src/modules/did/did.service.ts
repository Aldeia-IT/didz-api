import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IpfsService } from '../../providers/ipfs/ipfs.service';
import { CreateDidDto } from './dtos/payload/create-did.dto';
import {
  generateDidHas,
  generateEd25519KeyPair,
} from '../../common/crypto-utils';
import * as bs58 from 'bs58';
import Ajv from 'ajv';
import axios from 'axios';

@Injectable()
export class DidService {
  constructor(private ipfsService: IpfsService) {}
  async createDid(createDidDto: CreateDidDto) {
    try {
      //did:ebf: hash({name} + time, 32 )
      const didHash = generateDidHas(createDidDto.data.toString());
      const didMethod = process.env.DEFAULT_DID_METHOD;
      const did = `did:${didMethod}:${didHash}`;
      console.log(did);
      const didController = process.env.ADMIN_DID_CONTROLLER_ADDRESS;

      const keyPair = generateEd25519KeyPair(didController);
      const publicKeyMultibase = `z${bs58
        .encode(Buffer.from(keyPair.publicKey))
        .toString()}`;

      const didDocument = {
        '@context': [
          'https://www.w3.org/ns/did/v1',
          'https://w3id.org/security/suites/ed25519-2020/v1',
          {},
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
      createDidDto.data['@context'] = createDidDto.type;
      didDocument[createDidDto.type] = createDidDto.data;
      const objContext = {};
      objContext[createDidDto.type] = createDidDto.schemaUrl;
      didDocument['@context'][2] = objContext;

      console.log(didDocument);

      const ajv = new Ajv();
      const sch = await axios.get(createDidDto.schemaUrl);
      const validate = ajv.compile(sch.data);

      if (!validate(didDocument)) {
        throw new Error(validate.errors.map((e) => e.message).join(' '));
      }

      const ipfsUrl = await this.ipfsService.uploadAndPinJson(didDocument);
      console.log('File uploaded and pinned successfully:', ipfsUrl);
      return didDocument;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      console.log(e);
    }
  }

  async retrieveDid(cid: string) {
    try {
      const data = await this.ipfsService.retrieveJson(cid);
      console.log('File retrieved successfully:', data);
      return data;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      console.log(e);
    }
  }
}

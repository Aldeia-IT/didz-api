import { Injectable } from '@nestjs/common';
import { IpfsService } from '../../providers/ipfs/ipfs.service';
import { CreateDidDto } from './dtos/payload/create-did.dto';
import { generateEd25519KeyPair } from '../../common/crypto-utils';
import * as bs58 from 'bs58';
import Ajv from 'ajv';
import axios from 'axios';

@Injectable()
export class DidService {
  constructor(private ipfsService: IpfsService) {}
  async createDid(createDidDto: CreateDidDto) {
    try {
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

      const ipfsUrl = await this.ipfsService.uploadAndPinJson(didDocument);
      console.log('File uploaded and pinned successfully:', ipfsUrl);
      return ipfsUrl;
    } catch (e) {
      console.log(e);
    }
  }

  async retrieveDid(cid: string) {
    const data = await this.ipfsService.retrieveJson(cid);
    console.log('File retrieved successfully:', data);
    return 'did1 retrieved';
  }
}

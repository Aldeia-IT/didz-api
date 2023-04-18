import { Injectable } from '@nestjs/common';
import { IpfsService } from '../../providers/ipfs/ipfs.service';

@Injectable()
export class DidService {
  constructor(private ipfsService: IpfsService) {}
  async createDid(text: string) {
    const data = {
      did: 'did:ethr:123x',
    };
    const ipfsUrl = await this.ipfsService.uploadAndPinJson(data);
    console.log('File uploaded and pinned successfully:', ipfsUrl);
    return 'did1 created';
  }

  async retrieveDid(cid: string) {
    const data = await this.ipfsService.retrieveJson(cid);
    console.log('File retrieved successfully:', data);
    return 'did1 retrieved';
  }
}

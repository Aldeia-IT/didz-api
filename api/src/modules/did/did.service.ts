import { Injectable } from '@nestjs/common';
import { IpfsService } from '../../providers/ipfs/ipfs.service';

@Injectable()
export class DidService {
  constructor(private ipfsService: IpfsService) {}
  async createDid(text: string) {
    const data = {
      did: 'did:ethr:123',
    };
    const ipfsUrl = await this.ipfsService.uploadAndPinJson(data);
    console.log('File uploaded and pinned successfully:', ipfsUrl);
    return 'did1 created';
  }
}

import { Injectable } from '@nestjs/common';
import { IpfsService } from '../../providers/ipfs/ipfs.service';

@Injectable()
export class DidService {
  constructor(private ipfsService: IpfsService) {}
  async createDid(text: string) {
    const filePath = './path/to/your/file.txt';
    const ipfsUrl = await this.ipfsService.uploadAndPinText(text);
    console.log('File uploaded and pinned successfully:', ipfsUrl);
    return 'did1 created';
  }
}

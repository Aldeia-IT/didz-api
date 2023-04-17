import { IpfsProvider } from './ipfs.provider.interface';

export class IpfsService {
  constructor(private ipfsProvider: IpfsProvider) {}

  async uploadAndPinFile(filePath: string): Promise<string> {
    return this.ipfsProvider.uploadAndPinFile(filePath);
  }

  async uploadAndPinText(text: string): Promise<string> {
    return this.ipfsProvider.uploadAndPinText(text);
  }
}

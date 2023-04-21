import { IpfsProvider } from './ipfs.provider.interface';

export class IpfsService {
  constructor(private ipfsProvider: IpfsProvider) {}

  async uploadAndPinFile(filePath: string): Promise<string> {
    return this.ipfsProvider.uploadAndPinFile(filePath);
  }

  async uploadAndPinJson(json: any): Promise<string> {
    return this.ipfsProvider.uploadAndPinJson(json);
  }

  async retrieveJson(cid: string): Promise<string> {
    return this.ipfsProvider.retrieveJson(cid);
  }
}

import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { IpfsProvider } from './ipfs.provider.interface';

@Injectable()
export class PinataIpfsService implements IpfsProvider {
  private pinataApiKey: string;
  private pinataSecretApiKey: string;

  constructor() {
    this.pinataApiKey = process.env.PINATA_IPFS_API_KEY;
    this.pinataSecretApiKey = process.env.PINATA_IPFS_API_SECRET;
  }

  uploadAndPinFile(filePath: string): Promise<string> {
    console.log('calling upload and pin file from pinata service');
    throw new Error('Method not implemented.');
  }
  async uploadAndPinJson(json: any): Promise<string> {
    console.log('calling upload and pin text from pinata service: ', json);
    const data = JSON.stringify({
      pinataOptions: {
        cidVersion: 1,
      },
      pinataMetadata: {
        name: json.did,
      },
      pinataContent: {
        json,
      },
    });
    console.log('data: ', data);

    const config = {
      method: 'post',
      url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      headers: {
        'Content-Type': 'application/json',
        pinata_api_key: this.pinataApiKey,
        pinata_secret_api_key: this.pinataSecretApiKey,
      },
      data: data,
    };

    const res = await axios(config);
    console.log('response', res);
    return res.data.IpfsHash;
  }
}

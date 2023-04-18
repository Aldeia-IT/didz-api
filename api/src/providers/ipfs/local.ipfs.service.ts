import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { IpfsProvider } from './ipfs.provider.interface';

@Injectable()
export class LocalIpfsService implements IpfsProvider {
  private localApiUrl: string;
  private localGateway: string;
  constructor() {
    this.localApiUrl = process.env.LOCAL_IPFS_API_URL;
    this.localGateway = process.env.LOCAL_IPFS_GATEWAY;
  }
  uploadAndPinFile(filePath: string): Promise<string> {
    console.log('calling upload and pin file from local service');
    throw new Error('Method not implemented.');
  }
  async uploadAndPinJson(json: any): Promise<string> {
    console.log('calling upload and pin text from local service: ', json);
    const data = JSON.stringify(json);
    console.log('data: ', data);
    //curl -X POST -F file=@file.txt "http://127.0.0.1:5001/api/v0/add"
    const config = {
      method: 'post',
      url: `${this.localApiUrl}/api/v0/add`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    const res = await axios(config);
    console.log('response', res);
    return res.data.IpfsHash;
  }

  retrieveJson(cid: string): Promise<string> {
    console.log('calling retrieve json from local service', cid);
    throw new Error('Method not implemented.');
  }
}

import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { IpfsProvider } from './ipfs.provider.interface';

@Injectable()
export class LocalIpfsService implements IpfsProvider {
  uploadAndPinFile(filePath: string): Promise<string> {
    console.log('calling upload and pin file from local service');
    throw new Error('Method not implemented.');
  }
  uploadAndPinJson(json: any): Promise<string> {
    console.log('calling upload and pin text from local service', json);
    throw new Error('Method not implemented.');
  }

  retrieveJson(cid: string): Promise<string> {
    console.log('calling retrieve json from local service', cid);
    throw new Error('Method not implemented.');
  }
}

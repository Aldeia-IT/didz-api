import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { IpfsProvider } from './ipfs.provider.interface';

@Injectable()
export class LocalIpfsService implements IpfsProvider {
  uploadAndPinFile(filePath: string): Promise<string> {
    console.log('calling upload and pin file from local service');
    throw new Error('Method not implemented.');
  }
  uploadAndPinText(text: string): Promise<string> {
    console.log('calling upload and pin text from local service');
    throw new Error('Method not implemented.');
  }
}

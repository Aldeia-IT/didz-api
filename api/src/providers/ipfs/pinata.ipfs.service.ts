import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { IpfsProvider } from './ipfs.provider.interface';

@Injectable()
export class PinataIpfsService implements IpfsProvider {
  uploadAndPinFile(filePath: string): Promise<string> {
    console.log('calling upload and pin file from pinata service');
    throw new Error('Method not implemented.');
  }
  uploadAndPinText(text: string): Promise<string> {
    console.log('calling upload and pin text from pinata service');
    throw new Error('Method not implemented.');
  }
}

import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { IpfsProvider } from './ipfs.provider.interface';
import * as FormData from 'form-data';

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
    try {
      console.log('calling upload and pin text from local service: ', json);
      const data = JSON.stringify(json);
      console.log('data: ', data);
      const jsonBuffer = Buffer.from(data, 'utf-8');
      const formData = new FormData();
      formData.append('file', jsonBuffer, {
        contentType: 'application/json',
        filename: 'file.json',
      });
      const response = await axios.post(
        `${this.localApiUrl}/api/v0/add`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        },
      );

      return response.data?.Hash;
    } catch (e) {
      console.log(e);
    }
  }

  async retrieveJson(cid: string): Promise<string> {
    console.log('Trying to retrieve this CID: ', cid);
    try {
      const response = await axios.get(`${this.localGateway}/${cid}`);
      return response.data;
    } catch (error) {
      console.error(`Error retrieving file with CID ${cid}:`, error);
      throw error;
    }
  }
}

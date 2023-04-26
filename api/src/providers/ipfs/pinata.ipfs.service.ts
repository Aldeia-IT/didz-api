import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IpfsProvider } from './ipfs.provider.interface';

@Injectable()
export class PinataIpfsService implements IpfsProvider {
  private pinataApiKey: string;
  private pinataSecretApiKey: string;
  private pinataApiUrl: string;
  private pinataGateway: string;
  constructor() {
    this.pinataApiKey = process.env.PINATA_IPFS_API_KEY;
    this.pinataSecretApiKey = process.env.PINATA_IPFS_API_SECRET;
    this.pinataApiUrl = process.env.PINATA_IPFS_API_URL;
    this.pinataGateway = process.env.PINATA_IPFS_GATEWAY;
  }

  uploadAndPinFile(filePath: string): Promise<string> {
    console.log('calling upload and pin file from pinata service');
    throw new Error('Method not implemented.');
  }
  async uploadAndPinJson(json: any): Promise<string> {
    try {
      console.log('calling upload and pin text from pinata service: ', json);
      const data = JSON.stringify({
        pinataOptions: {
          cidVersion: 1,
        },
        pinataMetadata: {
          name: json.id,
        },
        pinataContent: {
          json,
        },
      });
      console.log('data: ', data);

      const config = {
        method: 'post',
        url: `${this.pinataApiUrl}/pinning/pinJSONToIPFS`,
        headers: {
          'Content-Type': 'application/json',
          pinata_api_key: this.pinataApiKey,
          pinata_secret_api_key: this.pinataSecretApiKey,
        },
        data: data,
      };

      const res = await axios(config);
      return res.data.IpfsHash;
    } catch (e) {
      console.log(e);
    }
  }

  async retrieveJson(did: string): Promise<string> {
    console.log('Trying to retrieve this DID: ', did);
    const headers = {
      headers: {
        pinata_api_key: this.pinataApiKey,
        pinata_secret_api_key: this.pinataSecretApiKey,
      },
    };
    let response;
    let cid;
    try {
      response = await axios.get(
        `${this.pinataApiUrl}/data/pinList?status=pinned&metadata[name]=${did}`,
        headers,
      );
    } catch (error) {
      console.error(`Error retrieving file with DID ${did}:`, error);
      throw new Error(`Error retrieving file with DID ${did}`);
    }
    try {
      cid = response.data.rows[0].ipfs_pin_hash;
      const cid_response = await axios.get(
        `${this.pinataGateway}/${cid}`,
        headers,
      );
      return cid_response.data.json;
    } catch (error) {
      console.error(`Error retrieving file with CID ${cid}:`, error);
      throw new Error(
        `Error retrieving file with CID ${cid}. Please try again later. Sometimes Pinata get more time to available files.`,
      );
    }
  }
}

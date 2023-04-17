import { IpfsProvider } from './ipfs.provider.interface';
import { PinataIpfsService } from './pinata.ipfs.service';
import { LocalIpfsService } from './local.ipfs.service';

export function ipfsProviderFactory(): IpfsProvider {
  const ipfsUrl = process.env.IPFS_API_URL;
  console.log('ipfsUrl', ipfsUrl);
  if (isPinataImplementation(ipfsUrl)) {
    console.log('pinata implementation');
    return new PinataIpfsService();
  } else if (isLocalImplementation(ipfsUrl)) {
    console.log('local implementation');
    return new LocalIpfsService();
  } else {
    throw new Error('No IPFS provider found in the environment configuration.');
  }
}

function isLocalImplementation(apiUrl: string): boolean {
  const localKeywords = ['localhost', '127.0.0.1'];
  const startsWithHttp = /^https?:\/\//;

  if (!startsWithHttp.test(apiUrl)) {
    return true;
  }

  return localKeywords.some((keyword) => apiUrl.includes(keyword));
}

function isPinataImplementation(apiUrl: string): boolean {
  const localKeywords = ['pinata'];

  return localKeywords.some((keyword) => apiUrl.includes(keyword));
}

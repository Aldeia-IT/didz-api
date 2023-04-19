import { IpfsProvider } from './ipfs.provider.interface';
import { PinataIpfsService } from './pinata.ipfs.service';
import { LocalIpfsService } from './local.ipfs.service';

export function ipfsProviderFactory(): IpfsProvider {
  const ipfsUrl = process.env.IPFS_API_URL;
  const ipfsProvider = process.env.IPFS_PROVIDER;
  console.log('ipfsUrl', ipfsUrl);
  console.log('ipfsProvider', ipfsProvider);
  if (ipfsProvider === 'pinata') {
    console.log('pinata implementation');
    return new PinataIpfsService();
  } else if (ipfsProvider === 'local') {
    console.log('local implementation');
    return new LocalIpfsService();
  } else {
    throw new Error('No IPFS provider found in the environment configuration.');
  }
}

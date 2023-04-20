import * as nacl from 'tweetnacl';
import { createHash } from 'crypto';

export function generateEd25519KeyPair(controller: string) {
  console.log('controller: ', controller);
  const hash = createHash('sha256');
  hash.update(controller);
  const seed = hash.digest().slice(0, 32); // Use the first 32 bytes of the SHA-256 hash as the seed
  const keyPair = nacl.sign.keyPair.fromSeed(seed);
  return {
    publicKey: keyPair.publicKey,
    privateKey: keyPair.secretKey,
  };
}

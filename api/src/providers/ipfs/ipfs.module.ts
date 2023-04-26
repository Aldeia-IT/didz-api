import { Module } from '@nestjs/common';
import { IpfsService } from './ipfs.service';
import { HttpModule } from '@nestjs/axios';
import { ipfsProviderFactory } from './ipfs.provider.factory';
import { PinataIpfsService } from './pinata.ipfs.service';
import { LocalIpfsService } from './local.ipfs.service';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: IpfsService,
      useFactory: ipfsProviderFactory,
    },
    PinataIpfsService,
    LocalIpfsService,
  ],
  exports: [IpfsService],
})
export class IpfsModule {}

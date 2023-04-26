import { Module } from '@nestjs/common';
import { DidController } from './did.controller';
import { DidService } from './did.service';
import { IpfsModule } from '../../providers/ipfs/ipfs.module';

@Module({
  imports: [IpfsModule],
  controllers: [DidController],
  providers: [DidService],
})
export class DidModule {}

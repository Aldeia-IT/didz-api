import { Test, TestingModule } from '@nestjs/testing';
import { DidService } from './did.service';
import { IpfsService } from '../../providers/ipfs/ipfs.service';

describe('DidService', () => {
  let service: DidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DidService, IpfsService],
    }).compile();

    service = module.get<DidService>(DidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { DidController } from './did.controller';
import { DidService } from './did.service';
import { IpfsModule } from '../../providers/ipfs/ipfs.module';
import { IpfsService } from '../../providers/ipfs/ipfs.service';
import { PinataIpfsService } from '../../providers/ipfs/pinata.ipfs.service';
import { LocalIpfsService } from '../../providers/ipfs/local.ipfs.service';

const mockIpfsService = {
  uploadAndPinFile: jest.fn(),
  uploadAndPinJson: jest.fn(),
  retrieveJson: jest.fn(),
};

const mockPinataIpfsService = {
  uploadAndPinFile: jest.fn(),
  uploadAndPinJson: jest.fn(),
  retrieveJson: jest.fn(),
};

const mockLocalIpfsService = {
  uploadAndPinFile: jest.fn(),
  uploadAndPinJson: jest.fn(),
  retrieveJson: jest.fn(),
};

describe('DidController', () => {
  let controller: DidController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [IpfsModule],
      controllers: [DidController],
      providers: [DidService],
    })
      .overrideProvider(IpfsService)
      .useValue(mockIpfsService)
      .overrideProvider(PinataIpfsService)
      .useValue(mockPinataIpfsService)
      .overrideProvider(LocalIpfsService)
      .useValue(mockLocalIpfsService)
      .compile();

    controller = module.get<DidController>(DidController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

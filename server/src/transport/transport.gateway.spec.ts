import { Test, TestingModule } from '@nestjs/testing';
import { TransportGateway } from './transport.gateway';

describe('TransportGateway', () => {
  let gateway: TransportGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransportGateway],
    }).compile();

    gateway = module.get<TransportGateway>(TransportGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});

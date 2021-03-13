import { Test, TestingModule } from '@nestjs/testing';
import { ConnectiontestController } from './connectiontest.controller';

describe('ConnectiontestController', () => {
  let controller: ConnectiontestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConnectiontestController],
    }).compile();

    controller = module.get<ConnectiontestController>(ConnectiontestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

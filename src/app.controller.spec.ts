import { Test, TestingModule } from '@nestjs/testing';
import { NFTController } from './app.controller';
import { NftService } from 'services/nft.service';

describe('NFTController', () => {
  let appController: NFTController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NFTController],
      providers: [NftService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});

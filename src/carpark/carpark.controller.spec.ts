import { Test, TestingModule } from '@nestjs/testing';
import { CarparkController } from './carpark.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CarparkEntity } from './carpark.entity';
import { CarparkService } from './carpark.service';

describe('Carpark Controller', () => {
  let controller: CarparkController;

  beforeEach(async () => {
    const mockedRepo = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      findOne: jest.fn((params) => Promise.resolve()),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      findOneBy: jest.fn((params) => Promise.resolve()),
      count: jest.fn(() => Promise.resolve(1)),
      countBy: jest.fn(() => Promise.resolve(0)),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      findAndCount: jest.fn((params) => Promise.resolve([[], 1])),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarparkService,
        {
          provide: getRepositoryToken(CarparkEntity),
          useValue: mockedRepo,
        },
      ],
      controllers: [CarparkController],
    }).compile();

    controller = module.get<CarparkController>(CarparkController);
  });

  describe('search', () => {
    it('should return success', async () => {
      const result = await controller.getByParams({
        freeParking: 'NO',
        page: 1,
        pageSize: 10,
        nightParking: 'YES',
        minimumGantryHeight: 1,
      });
      expect(result).toStrictEqual({
        data: [],
        page: 1,
        pageSize: 10,
        totalItem: 1,
        totalPage: 1,
      });
    });
  });
});

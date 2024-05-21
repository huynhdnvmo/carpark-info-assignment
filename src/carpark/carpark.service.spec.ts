import { Test, TestingModule } from '@nestjs/testing';
import { CarparkService } from './carpark.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CarparkEntity } from './carpark.entity';

describe('CarparkService', () => {
  let service: CarparkService;

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
    }).compile();

    service = module.get<CarparkService>(CarparkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

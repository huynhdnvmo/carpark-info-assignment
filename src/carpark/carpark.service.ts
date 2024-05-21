import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, MoreThan, Repository } from 'typeorm';
import { CarparkEntity } from './carpark.entity';
import { ListCarParkDto } from './dto/list-carpark.dto';
import { IPagination } from 'src/share/common';

@Injectable()
export class CarparkService {
  constructor(
    @InjectRepository(CarparkEntity)
    private carparkRepository: Repository<CarparkEntity>,
  ) {}

  async findCarPark(
    query: ListCarParkDto,
  ): Promise<IPagination<CarparkEntity>> {
    const page = query?.page > 0 ? Number(query.page) : 1;
    const pageSize = query?.pageSize > 0 ? Number(query.pageSize) : 20;

    const options: FindManyOptions = {
      take: pageSize,
      skip: (page - 1) * pageSize,
      where: {
        freeParking: query.freeParking || undefined,
        nightParking: query.nightParking || undefined,
        gantryHeight: query.minimumGantryHeight
          ? MoreThan(+query.minimumGantryHeight)
          : undefined,
      },
    };

    const [data, totalItem] =
      await this.carparkRepository.findAndCount(options);

    const totalPage =
      totalItem % pageSize === 0
        ? totalItem / pageSize
        : Math.floor(totalItem / pageSize) + 1;
    return {
      data,
      page,
      pageSize,
      totalPage,
      totalItem,
    };
  }

  create(entity: CarparkEntity): Promise<CarparkEntity> {
    return this.carparkRepository.save(entity);
  }
}

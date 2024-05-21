import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { FavoriteEntity } from './favorite.entity';
import { ListFavoriteDto } from './dto/list-favorite.dto';
import { IPagination } from 'src/share/common';

const mockUserId = 1;

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private favoriteRepository: Repository<FavoriteEntity>,
  ) {}

  async findMyFavorite(
    query: ListFavoriteDto,
  ): Promise<IPagination<FavoriteEntity>> {
    const page = query?.page > 0 ? Number(query.page) : 1;
    const pageSize = query?.pageSize > 0 ? Number(query.pageSize) : 20;

    const options: FindManyOptions = {
      take: pageSize,
      skip: (page - 1) * pageSize,
      where: {
        userId: mockUserId,
      },
      relations: ['carpark'],
    };

    const [data, totalItem] =
      await this.favoriteRepository.findAndCount(options);

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

  async addMyFavorite(carParkNo: string): Promise<FavoriteEntity> {
    const foundFavorite = await this.favoriteRepository.findOneBy({
      userId: mockUserId,
      carParkNo,
    });
    if (foundFavorite) {
      throw new BadRequestException('favorite is added');
    }
    const favorite = new FavoriteEntity();
    favorite.carParkNo = carParkNo;
    favorite.userId = mockUserId;

    return this.favoriteRepository.save(favorite);
  }
}

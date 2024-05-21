import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FavoriteEntity } from './favorite.entity';
import { ListFavoriteDto } from './dto/list-favorite.dto';
import { IPagination } from 'src/share/common';
import { FavoriteService } from './favorite.service';
import { AddMyFavoriteDto } from './dto/add-my-favorite.dto';

@Controller('favorite')
@ApiTags('Favorite')
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @HttpCode(HttpStatus.OK)
  @Get('my-favorite')
  myFavorite(
    @Query() query: ListFavoriteDto,
  ): Promise<IPagination<FavoriteEntity>> {
    return this.favoriteService.findMyFavorite(query);
  }

  @Post('my-favorite')
  addMyFavorite(@Body() body: AddMyFavoriteDto): Promise<FavoriteEntity> {
    return this.favoriteService.addMyFavorite(body.carParkNo);
  }
}

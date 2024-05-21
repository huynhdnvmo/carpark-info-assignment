import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteEntity } from './favorite.entity';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteEntity])],
  providers: [FavoriteService],
  controllers: [FavoriteController],
})
export class FavoriteModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarparkTempEntity } from './carpark-temp.entity';
import { CarparkFileEntity } from './carpark-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarparkFileEntity, CarparkTempEntity])],
  providers: [],
  controllers: [],
})
export class CarparkTempModule {}

import { Module } from '@nestjs/common';
import { CarparkService } from './carpark.service';
import { CarparkController } from './carpark.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarparkEntity } from './carpark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarparkEntity])],
  providers: [CarparkService],
  controllers: [CarparkController],
})
export class CarparkModule {}

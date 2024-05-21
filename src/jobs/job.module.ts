import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarparkEntity } from 'src/carpark/carpark.entity';
import { CarparkFileEntity } from 'src/carpark-temp/carpark-file.entity';
import { CarparkTempEntity } from 'src/carpark-temp/carpark-temp.entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([
      CarparkEntity,
      CarparkFileEntity,
      CarparkTempEntity,
    ]),
  ],
  providers: [JobService],
  controllers: [],
})
export class JobModule {}

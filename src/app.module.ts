import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CarparkModule } from './carpark/carpark.module';
import { ScheduleModule } from '@nestjs/schedule';
import { JobModule } from './jobs/job.module';
import { CarparkTempModule } from './carpark-temp/carpark-temp.module';
import { UserModule } from './user/user.module';
import { FavoriteModule } from './favorite/favorite.module';

const CONFIG_SQL_LITE: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'carpark_db',
  // dropSchema: true,
  // logging: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // change to false when do real project add make a migration
};

@Module({
  imports: [
    TypeOrmModule.forRoot(CONFIG_SQL_LITE),
    CarparkTempModule,
    CarparkModule,
    ScheduleModule.forRoot(),
    JobModule,
    UserModule,
    FavoriteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

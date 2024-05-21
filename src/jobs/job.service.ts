import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { JobCarParkData } from './job.type';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CarparkFileEntity } from 'src/carpark-temp/carpark-file.entity';
import { CarparkTempEntity } from 'src/carpark-temp/carpark-temp.entity';
import { CarparkEntity } from 'src/carpark/carpark.entity';

@Injectable()
export class JobService {
  private readonly logger = new Logger(JobService.name);
  constructor(
    @InjectRepository(CarparkFileEntity)
    private carparkFileRepository: Repository<CarparkFileEntity>,
    @InjectRepository(CarparkTempEntity)
    private carparkFileTempRepository: Repository<CarparkTempEntity>,
    private dataSource: DataSource,
  ) {}

  @Timeout(1)
  async loadDataFromFile() {
    const FILE_NAME = 'hdb-carpark-information-20220824010400.csv'; // move to tmp folder if this is real project
    const PATH_FILE = `${__dirname}/../../${FILE_NAME}`;

    const carparkFile = await this.carparkFileRepository.save({
      name: FILE_NAME,
    });

    fs.createReadStream(PATH_FILE)
      .pipe(csv())
      .on('error', (err) => {
        this.logger.error(err);
      })
      .on('data', async (data: JobCarParkData) => {
        try {
          const carParkData = new CarparkTempEntity();
          carParkData.carParkNo = data.car_park_no;
          carParkData.address = data.address;
          carParkData.xCoord = data.x_coord;
          carParkData.yCoord = data.y_coord;
          carParkData.carParkType = data.car_park_type;
          carParkData.typeOfParkingSystem = data.type_of_parking_system;
          carParkData.shortTermParking = data.short_term_parking;
          carParkData.freeParking = data.free_parking;
          carParkData.nightParking = data.night_parking;
          carParkData.carParkDecks = data.car_park_decks;
          carParkData.gantryHeight = data.gantry_height;
          carParkData.carParkBasement = data.car_park_basement;
          carParkData.carparkFile = carparkFile;

          await this.carparkFileTempRepository
            .save(carParkData)
            .then((res) =>
              this.logger.log(`Inserted ${res.carParkNo} in the database`),
            )
            .catch((e) => this.logger.error(e));
        } catch (err) {
          this.logger.error(err);
        }
      })
      .on('end', () => {
        this.logger.log(`Loaded ${FILE_NAME} file in the database`);
        this.transformDataFromTempToMain();
      });
  }

  /*
   * Transform data from carpark_temp table to carpark table
   */
  // @Timeout(1)
  async transformDataFromTempToMain() {
    const carparkFile = await this.carparkFileRepository.findOneBy({
      isTransform: 0,
    });
    if (!carparkFile) {
      this.logger.log('File not found');
      return;
    }
    const recordInFiles = await this.carparkFileTempRepository.findBy({
      carparkFileId: 1,
    });
    if (!recordInFiles?.length) {
      this.logger.log(`The data file in transformed to carpark table`);
      return;
    }
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (const record of recordInFiles) {
        const carparkRecord = new CarparkEntity();
        carparkRecord.carParkNo = record.carParkNo;
        carparkRecord.address = record.address;
        carparkRecord.xCoord = +record.xCoord;
        carparkRecord.yCoord = +record.yCoord;
        carparkRecord.carParkType = record.carParkType;
        carparkRecord.typeOfParkingSystem = record.typeOfParkingSystem;
        carparkRecord.shortTermParking = record.shortTermParking;
        carparkRecord.freeParking = record.freeParking;
        carparkRecord.nightParking = record.nightParking;
        carparkRecord.carParkDecks = +record.carParkDecks;
        carparkRecord.gantryHeight = +record.gantryHeight;
        carparkRecord.carParkBasement = record.carParkBasement;
        await queryRunner.manager.save(carparkRecord);
      }
      await this.carparkFileRepository.update(carparkFile.id, {
        isTransform: 1,
      });
      this.logger.log(
        `The ${carparkFile.name} file in transformed to carpark table`,
      );
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(error?.message);
      throw new BadRequestException(error?.message);
    } finally {
      await queryRunner.release();
    }
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { CarparkService } from './carpark.service';
import { CarparkEntity } from './carpark.entity';
import { ListCarParkDto } from './dto/list-carpark.dto';
import { IPagination } from 'src/share/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateCarParkDto } from './dto/create-carpark.dto';

@Controller('carpark')
@ApiTags('Carpark')
export class CarparkController {
  constructor(private carparkService: CarparkService) {}

  @ApiOkResponse({
    description: 'Filter the list of carpark by the following criteria',
    content: {
      schema: {
        example: {
          data: [
            {
              carParkNo: 'ACB_HUYNHDN',
              address: 'BLK 270/271 ALBERT CENTRE BASEMENT CAR PARK',
              xCoord: 30314.7936,
              yCoord: 30314.7936,
              carParkType: 'BASEMENT CAR PARK',
              typeOfParkingSystem: 'ELECTRONIC PARKING',
              shortTermParking: 'WHOLE DAY',
              freeParking: 'SUN & PH FR 7AM-10.30PM',
              nightParking: 'YES',
              carParkDecks: 1,
              gantryHeight: 1.8,
              carParkBasement: 'Y',
            },
          ],
          page: 1,
          pageSize: 20,
          totalPage: 100,
          totalItem: 100,
        },
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  getByParams(
    @Query() query: ListCarParkDto,
  ): Promise<IPagination<CarparkEntity>> {
    return this.carparkService.findCarPark(query);
  }

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CarparkEntity,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() body: CreateCarParkDto): Promise<CarparkEntity> {
    return this.carparkService.create(body);
  }
}

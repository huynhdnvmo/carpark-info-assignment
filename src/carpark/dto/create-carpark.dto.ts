import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNumber, IsString, Min } from 'class-validator';

export class CreateCarParkDto {
  @ApiProperty({
    example: 'ACB',
  })
  @IsString()
  carParkNo: string;

  @ApiProperty({
    example: 'BLK 270/271 ALBERT CENTRE BASEMENT CAR PARK',
  })
  @IsString()
  address: string;

  @ApiProperty({
    example: 30314.7936,
  })
  @IsNumber()
  xCoord: number;

  @ApiProperty({
    example: 30314.7936,
  })
  @IsNumber()
  yCoord: number;

  @ApiProperty({
    example: 'BASEMENT CAR PARK',
  })
  @IsString()
  carParkType: string;

  @ApiProperty({
    example: 'ELECTRONIC PARKING',
  })
  @IsString()
  typeOfParkingSystem: string;

  @ApiProperty({
    example: 'WHOLE DAY',
  })
  @IsString()
  shortTermParking: string;

  @ApiProperty({
    example: 'SUN & PH FR 7AM-10.30PM',
  })
  @IsString()
  freeParking: string;

  @ApiProperty({
    example: 'NO',
  })
  @IsString()
  @IsIn(['YES', 'NO'])
  nightParking: string;

  @ApiProperty({
    example: 1,
  })
  @IsInt()
  @Min(0)
  carParkDecks: number;

  @ApiProperty({
    example: 1.8,
  })
  @IsNumber()
  gantryHeight: number;

  @ApiProperty({
    example: 'Y',
  })
  @IsString()
  @IsIn(['Y', 'N'])
  carParkBasement: string;
}

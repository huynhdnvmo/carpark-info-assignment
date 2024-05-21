import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'carpark' })
export class CarparkEntity {
  // @PrimaryGeneratedColumn()
  // id: number;

  @ApiProperty({
    example: 'ACB',
  })
  @PrimaryColumn({ name: 'car_park_no', length: 6 })
  carParkNo: string;

  @ApiProperty({
    example: 'BLK 270/271 ALBERT CENTRE BASEMENT CAR PARK',
  })
  @Column()
  address: string;

  @ApiProperty({
    example: 30314.7936,
  })
  @Column('float', { name: 'x_coord' })
  xCoord: number;

  @ApiProperty({
    example: 30314.7936,
  })
  @Column('float', { name: 'y_coord' })
  yCoord: number;

  @ApiProperty({
    example: 'BASEMENT CAR PARK',
  })
  @Column({ name: 'car_park_type' })
  carParkType: string;

  @ApiProperty({
    example: 'ELECTRONIC PARKING',
  })
  @Column({ name: 'type_of_parking_system' }) // define enum if need
  typeOfParkingSystem: string;

  @ApiProperty({
    example: 'WHOLE DAY',
  })
  @Column({ name: 'short_term_parking' })
  shortTermParking: string;

  @ApiProperty({
    example: 'SUN & PH FR 7AM-10.30PM',
  })
  @Column({ name: 'free_parking' })
  freeParking: string;

  @ApiProperty({
    example: 'YES',
  })
  @Column({ name: 'night_parking' })
  nightParking: string;

  @ApiProperty({
    example: 1,
  })
  @Column('int', { name: 'car_park_decks' })
  carParkDecks: number;

  @ApiProperty({
    example: 1.8,
  })
  @Column('float', { name: 'gantry_height' })
  gantryHeight: number;

  @ApiProperty({
    example: 'Y',
  })
  @Column({ name: 'car_park_basement' })
  carParkBasement: string;
}

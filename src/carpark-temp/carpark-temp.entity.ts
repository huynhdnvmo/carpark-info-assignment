import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CarparkFileEntity } from './carpark-file.entity';

@Entity({ name: 'carpark_temp' })
export class CarparkTempEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'car_park_no', default: null })
  carParkNo: string;

  @Column({ default: null })
  address: string;

  @Column({ name: 'x_coord', default: null })
  xCoord: string;

  @Column({ name: 'y_coord', default: null })
  yCoord: string;

  @Column({ name: 'car_park_type', default: null })
  carParkType: string;

  @Column({ name: 'type_of_parking_system', default: null })
  typeOfParkingSystem: string;

  @Column({ name: 'short_term_parking', default: null })
  shortTermParking: string;

  @Column({ name: 'free_parking', default: null })
  freeParking: string;

  @Column({ name: 'night_parking', default: null })
  nightParking: string;

  @Column({ name: 'car_park_decks', default: null })
  carParkDecks: string;

  @Column({ name: 'gantry_height', default: null })
  gantryHeight: string;

  @Column({ name: 'car_park_basement', default: null })
  carParkBasement: string;

  @Column({ name: 'carpark_file_id' })
  carparkFileId: number;

  @ManyToOne(() => CarparkFileEntity)
  @JoinColumn({ name: 'carpark_file_id' })
  carparkFile: CarparkFileEntity;
}

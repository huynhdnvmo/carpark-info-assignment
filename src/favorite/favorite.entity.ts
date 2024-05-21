import { CarparkEntity } from 'src/carpark/carpark.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'favorite' })
export class FavoriteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  carparkFile: UserEntity;

  @Column({ name: 'car_park_no' })
  carParkNo: string;

  @ManyToOne(() => CarparkEntity)
  @JoinColumn({ name: 'car_park_no' })
  carpark: CarparkEntity;
}

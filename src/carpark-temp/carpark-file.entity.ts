import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'carpark_file' })
export class CarparkFileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column('tinyint', { name: 'is_transform', default: 0 }) // 0 is false, 1 is true
  isTransform: number;

  @CreateDateColumn({ type: 'datetime' })
  created: Date;
}

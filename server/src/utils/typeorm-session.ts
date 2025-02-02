import { ISession } from 'connect-typeorm';
import {
  Index,
  Column,
  PrimaryColumn,
  Entity,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Sessions implements ISession {
  @Index()
  @Column('bigint')
  expiredAt = Date.now();

  @PrimaryColumn('varchar', { length: 255 })
  id = '';

  @Column('text')
  json = '';

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}

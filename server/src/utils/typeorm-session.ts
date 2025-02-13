import { ISession } from 'connect-typeorm';
import {
  Index,
  Column,
  Entity,
  PrimaryColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Session implements ISession {
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

import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { Cinema } from '../../cinema/entities';
import { BaseEntity } from '../../shared';

@Entity()
export class Movie extends BaseEntity {
  @Column({ type: 'text', unique: true })
  name: string;

  @OneToOne(() => Cinema)
  @JoinColumn()
  cinema: Cinema;
}

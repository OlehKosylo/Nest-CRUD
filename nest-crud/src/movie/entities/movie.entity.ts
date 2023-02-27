import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Cinema } from '../../cinema/entities';
import { BaseEntity } from '../../shared';

@Entity()
export class Movie extends BaseEntity {
  @Column({ type: 'text', unique: true })
  name: string;

  @ManyToOne(() => Cinema, (cinema) => cinema.id)
  @JoinColumn()
  cinema: Cinema;
}

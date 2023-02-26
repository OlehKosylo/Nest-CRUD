import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../../shared';

@Entity()
export class Cinema extends BaseEntity {
  @Column({ type: 'text', unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  suburb: string;
}

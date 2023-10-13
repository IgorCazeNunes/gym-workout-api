import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Rep {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('real')
  kg: number;

  @Column()
  qty: number;
}

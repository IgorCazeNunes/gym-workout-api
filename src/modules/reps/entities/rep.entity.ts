import { Serie } from 'src/modules/series/entities/series.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Rep {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('real')
  kg: number;

  @Column()
  qty: number;

  // @Column()
  // type: string;

  // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // created_at: Date;

  @ManyToOne(() => Serie, (serie) => serie.reps, {
    onDelete: 'CASCADE',
  })
  serie: Serie;
}

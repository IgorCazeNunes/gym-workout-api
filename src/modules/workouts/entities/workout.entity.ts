import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Serie } from 'src/modules/series/entities/series.entity';

@Entity()
export class Workout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: () => "'Novo Treino'" })
  name: string;

  @Column({ type: 'datetime', default: () => "datetime('now')" })
  finish_at: Date;

  @Column({ type: 'datetime', default: () => "datetime('now')" })
  created_at: Date;

  @OneToMany(() => Serie, (serie) => serie.workout, {
    cascade: true,
  })
  series: Serie[];
}

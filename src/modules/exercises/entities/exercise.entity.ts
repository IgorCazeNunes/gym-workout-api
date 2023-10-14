import { Serie } from 'src/modules/series/entities/series.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @OneToMany(() => Serie, (serie) => serie.exercise)
  series: Serie[];
}

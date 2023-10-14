import { Exercise } from 'src/modules/exercises/entities/exercise.entity';
import { Rep } from 'src/modules/reps/entities/rep.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Serie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Exercise, (exercise) => exercise.series)
  exercise: Exercise;

  @OneToMany(() => Rep, (rep) => rep.serie, { cascade: true })
  reps: Rep[];

  // @ManyToOne(() => Workout, (workout) => workout.series)
  // workout: Workout;
}

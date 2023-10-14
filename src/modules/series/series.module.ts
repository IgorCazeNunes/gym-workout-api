import { Module } from '@nestjs/common';
import { SeriesService } from './series.service';
import { SeriesController } from './series.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Serie } from './entities/series.entity';
import { Exercise } from '../exercises/entities/exercise.entity';
import { Rep } from '../reps/entities/rep.entity';
import { Workout } from '../workouts/entities/workout.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Serie, Exercise, Rep, Workout])],
  controllers: [SeriesController],
  providers: [SeriesService],
})
export class SeriesModule {}

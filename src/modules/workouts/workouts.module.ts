import { Module } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout } from './entities/workout.entity';
import { Serie } from '../series/entities/series.entity';
import { Rep } from '../reps/entities/rep.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workout, Serie, Rep])],
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
})
export class WorkoutsModule {}

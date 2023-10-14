import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExercisesModule } from './modules/exercises/exercises.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';
import { RepsModule } from './modules/reps/reps.module';
import { SeriesModule } from './modules/series/series.module';
import { WorkoutsModule } from './modules/workouts/workouts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    ExercisesModule,
    RepsModule,
    SeriesModule,
    WorkoutsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

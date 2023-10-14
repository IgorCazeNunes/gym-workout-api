import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExercisesModule } from './modules/exercises/exercises.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';
import { RepsModule } from './modules/reps/reps.module';
import { SeriesModule } from './modules/series/series.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    ExercisesModule,
    RepsModule,
    SeriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExercisesModule } from './modules/exercises/exercises.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';
import { RepsModule } from './modules/reps/reps.module';

@Module({
  imports: [ExercisesModule, RepsModule, TypeOrmModule.forRoot(config)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

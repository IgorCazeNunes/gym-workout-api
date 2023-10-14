import { Module } from '@nestjs/common';
import { RepsService } from './reps.service';
import { RepsController } from './reps.controller';
import { Rep } from './entities/rep.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Serie } from '../series/entities/series.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rep, Serie])],
  controllers: [RepsController],
  providers: [RepsService],
})
export class RepsModule {}

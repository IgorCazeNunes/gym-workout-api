import { Module } from '@nestjs/common';
import { RepsService } from './reps.service';
import { RepsController } from './reps.controller';
import { Rep } from './entities/rep.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Rep])],
  controllers: [RepsController],
  providers: [RepsService],
})
export class RepsModule {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateExerciseDto } from './create-exercise.dto';
import { IsOptional } from 'class-validator';

export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {
  @IsOptional()
  name: string;

  @IsOptional()
  image: string;
}

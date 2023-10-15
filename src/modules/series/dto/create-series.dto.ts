import { Type } from 'class-transformer';
import { IsObject, IsOptional, IsUUID, ValidateNested } from 'class-validator';

class ExerciseDto {
  @IsUUID()
  id: string;
}

class WorkoutDto {
  @IsUUID()
  id: string;
}

export class CreateSeriesDto {
  @IsObject()
  @ValidateNested()
  @IsOptional()
  @Type(() => ExerciseDto)
  exercise: ExerciseDto;

  @IsObject()
  @ValidateNested()
  @Type(() => WorkoutDto)
  workout: WorkoutDto;
}

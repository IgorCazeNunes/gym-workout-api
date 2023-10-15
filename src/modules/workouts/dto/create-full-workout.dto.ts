import {
  IsString,
  IsDate,
  ValidateNested,
  ArrayMinSize,
  IsArray,
  IsUUID,
  IsNumber,
} from 'class-validator';

class ExerciseDto {
  @IsUUID()
  id: string;
}

class RepDto {
  @IsNumber()
  kg: number;

  @IsNumber()
  qty: number;
}

class SerieDto {
  exercise: ExerciseDto;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  reps: RepDto[];
}

export class CreateFullWorkoutDto {
  @IsString()
  name: string;

  @IsDate()
  finish_at: Date;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  series: SerieDto[];
}

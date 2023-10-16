import { IsString } from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  name: string;

  @IsString()
  image: string;
}

class ExerciseDto {
  id: string;
}

class RepDto {
  kg: number;
  qty: number;
}

class SerieDto {
  exercise: ExerciseDto;
  reps: RepDto[];
}

export class CreateFullWorkoutDto {
  name: string;
  finish_at: Date;
  series: SerieDto[];
}

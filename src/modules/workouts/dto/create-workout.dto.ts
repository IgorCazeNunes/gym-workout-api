import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateWorkoutDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  finish_at: Date;
}

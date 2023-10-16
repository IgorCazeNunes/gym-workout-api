import { Type } from 'class-transformer';
import {
  IsNumber,
  IsObject,
  IsPositive,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

class SerieDto {
  @IsUUID()
  id: string;
}

export class CreateRepDto {
  @IsNumber()
  @IsPositive()
  kg: number;

  @IsNumber()
  @IsPositive()
  qty: number;

  @IsString()
  type: string;

  @IsObject()
  @ValidateNested()
  @Type(() => SerieDto)
  serie: SerieDto;
}

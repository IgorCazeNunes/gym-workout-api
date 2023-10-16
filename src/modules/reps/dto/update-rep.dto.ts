import { PartialType } from '@nestjs/mapped-types';
import { CreateRepDto } from './create-rep.dto';
import { IsOptional } from 'class-validator';

export class UpdateRepDto extends PartialType(CreateRepDto) {
  @IsOptional()
  kg: number;

  @IsOptional()
  qty: number;

  @IsOptional()
  type: string;
}

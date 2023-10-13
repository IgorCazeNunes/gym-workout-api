import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RepsService } from './reps.service';
import { CreateRepDto } from './dto/create-rep.dto';
import { UpdateRepDto } from './dto/update-rep.dto';
import { Rep } from './entities/rep.entity';

@Controller('reps')
export class RepsController {
  constructor(private readonly repsService: RepsService) {}

  @Get()
  async findAll(): Promise<Rep[]> {
    return this.repsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Rep> {
    return this.repsService.findOne(id);
  }

  @Post()
  async create(@Body() repeticaoData: CreateRepDto): Promise<Rep> {
    return this.repsService.create(repeticaoData);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRepDto: UpdateRepDto,
  ): Promise<Rep> {
    return this.repsService.update(id, updateRepDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.repsService.remove(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SeriesService } from './series.service';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Get()
  async findAll() {
    return await this.seriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.seriesService.findOne(id);
  }

  @Post()
  async create(@Body() serieDto: CreateSeriesDto) {
    return await this.seriesService.create(serieDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() serieDto: UpdateSeriesDto) {
    return await this.seriesService.update(id, serieDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.seriesService.remove(id);
  }
}

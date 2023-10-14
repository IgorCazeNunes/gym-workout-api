import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Get()
  async findAll() {
    return await this.workoutsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.workoutsService.findOne(id);
  }

  @Post()
  async create(@Body() workoutDto: CreateWorkoutDto) {
    return await this.workoutsService.create(workoutDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() workoutDto: UpdateWorkoutDto) {
    return await this.workoutsService.update(id, workoutDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.workoutsService.remove(id);
  }
}

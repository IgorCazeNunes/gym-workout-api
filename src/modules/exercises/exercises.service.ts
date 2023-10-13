import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './entities/exercise.entity';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private exercisesRepository: Repository<Exercise>,
  ) {}

  async findAll(): Promise<Exercise[]> {
    return await this.exercisesRepository.find();
  }

  async findOne(id: string): Promise<Exercise> {
    return await this.exercisesRepository.findOneBy({ id: id });
  }

  async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    const exercise = this.exercisesRepository.create(createExerciseDto);
    return await this.exercisesRepository.save(exercise);
  }

  async update(
    id: string,
    updateExerciseDto: UpdateExerciseDto,
  ): Promise<Exercise> {
    await this.exercisesRepository.update(id, updateExerciseDto);
    return this.exercisesRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.exercisesRepository.delete(id);
  }
}

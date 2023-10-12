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

  create(createExerciseDto: CreateExerciseDto) {
    return this.exercisesRepository.save(createExerciseDto);
  }

  findAll() {
    return this.exercisesRepository.find();
  }

  findOne(id: string) {
    return this.exercisesRepository.findOneBy({ id: id });
  }

  update(id: string, updateExerciseDto: UpdateExerciseDto) {
    return this.exercisesRepository.update(id, updateExerciseDto);
  }

  remove(id: string) {
    return this.exercisesRepository.delete(id);
  }
}

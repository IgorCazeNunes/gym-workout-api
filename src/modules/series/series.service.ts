import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from '../exercises/entities/exercise.entity';
import { Serie } from 'src/modules/series/entities/series.entity';
import { Workout } from '../workouts/entities/workout.entity';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Serie)
    private readonly seriesRepository: Repository<Serie>,

    @InjectRepository(Exercise)
    private readonly exercisesRepository: Repository<Exercise>,

    @InjectRepository(Workout)
    private readonly workoutsRepository: Repository<Workout>,
  ) {}

  async findAll(): Promise<Serie[]> {
    return await this.seriesRepository.find({
      relations: ['exercise', 'reps'],
    });
  }

  async findOne(id: string): Promise<Serie> {
    return await this.seriesRepository.findOne({
      where: { id },
      relations: ['exercise', 'reps'],
    });
  }

  async create(createSeriesDto: CreateSeriesDto): Promise<Serie> {
    const { exercise, workout } = createSeriesDto;

    console.log({ createSeriesDto });
    const findedExercise = await this.exercisesRepository.findOneBy({
      id: exercise.id,
    });
    const findedWorkout = await this.workoutsRepository.findOneBy({
      id: workout.id,
    });

    console.log({ findedExercise, findedWorkout });

    const newSerie = new Serie();
    newSerie.exercise = findedExercise;
    newSerie.workout = findedWorkout;

    return await this.seriesRepository.save(newSerie);
  }

  async update(id: string, serieDto: UpdateSeriesDto): Promise<Serie> {
    const { exercise, workout } = serieDto;
    const findedExercise = await this.exercisesRepository.findOneBy({
      id: exercise.id,
    });
    const findedWorkout = await this.workoutsRepository.findOneBy({
      id: workout.id,
    });

    const updatedSerie = await this.seriesRepository.findOneBy({ id: id });
    updatedSerie.exercise = findedExercise;
    updatedSerie.workout = findedWorkout;

    return await this.seriesRepository.save(updatedSerie);
  }

  async remove(id: string): Promise<void> {
    const serie = await this.seriesRepository.findOneBy({ id: id });

    if (!serie) {
      throw new NotFoundException(`Serie with id ${id} not found.`);
    }

    await this.seriesRepository.remove(serie);
  }
}

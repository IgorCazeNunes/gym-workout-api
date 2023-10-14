import { Serie } from 'src/modules/series/entities/series.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from '../exercises/entities/exercise.entity';
import { Rep } from '../reps/entities/rep.entity';
import { Workout } from '../workouts/entities/workout.entity';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Serie)
    private readonly seriesRepository: Repository<Serie>,

    @InjectRepository(Exercise)
    private readonly exercisesRepository: Repository<Exercise>,

    @InjectRepository(Rep)
    private readonly repsRepository: Repository<Rep>,

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
    const { exerciseId, workoutId } = createSeriesDto;
    const exercise = await this.exercisesRepository.findOneBy({
      id: exerciseId,
    });
    const workout = await this.workoutsRepository.findOneBy({ id: workoutId });

    const newSerie = new Serie();
    newSerie.exercise = exercise;
    newSerie.workout = workout;

    return await this.seriesRepository.save(newSerie);
  }

  async update(id: string, serieDto: UpdateSeriesDto): Promise<Serie> {
    const { exerciseId, workoutId } = serieDto;
    const exercise = await this.exercisesRepository.findOneBy({
      id: exerciseId,
    });
    const workout = await this.workoutsRepository.findOneBy({ id: workoutId });

    const updatedSerie = await this.seriesRepository.findOneBy({ id: id });
    updatedSerie.exercise = exercise;
    updatedSerie.workout = workout;

    return await this.seriesRepository.save(updatedSerie);
  }

  async remove(id: string): Promise<void> {
    const serie = await this.seriesRepository.findOneBy({ id: id });

    if (!serie) {
      throw new NotFoundException(`Serie with id ${id} not found.`);
    }

    await this.repsRepository.delete({ serie });
    await this.seriesRepository.remove(serie);
  }
}

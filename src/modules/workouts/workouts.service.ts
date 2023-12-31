import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout } from './entities/workout.entity';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { CreateFullWorkoutDto } from './dto/create-full-workout.dto';
import { Serie } from '../series/entities/series.entity';
import { Rep } from '../reps/entities/rep.entity';
import { Exercise } from '../exercises/entities/exercise.entity';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workout)
    private readonly workoutRepository: Repository<Workout>,

    @InjectRepository(Serie)
    private serieRepository: Repository<Serie>,

    @InjectRepository(Rep)
    private repRepository: Repository<Rep>,
  ) {}

  async findAll(): Promise<Workout[]> {
    return await this.workoutRepository
      .createQueryBuilder('workout')
      .leftJoinAndSelect('workout.series', 'series')
      .leftJoinAndSelect('series.exercise', 'exercise')
      .leftJoinAndSelect('series.reps', 'reps')
      .getMany();
  }

  async findOne(id: string): Promise<Workout> {
    return await this.workoutRepository
      .createQueryBuilder('workout')
      .where('workout.id = :id', { id: id })
      .leftJoinAndSelect('workout.series', 'series')
      .leftJoinAndSelect('series.exercise', 'exercise.name')
      .leftJoinAndSelect('series.reps', 'reps')
      .getOne();
  }

  async create(workoutDto: CreateWorkoutDto): Promise<Workout> {
    const newWorkout = new Workout();
    newWorkout.name = workoutDto.name;
    newWorkout.finish_at = workoutDto.finish_at;

    return await this.workoutRepository.save(newWorkout);
  }

  async createFull(
    createFullWorkoutDto: CreateFullWorkoutDto,
  ): Promise<Workout> {
    const { name, finish_at, series } = createFullWorkoutDto;

    const workout = this.workoutRepository.create({
      name,
      finish_at,
      series: series.map((serieDto) => {
        const serie = this.serieRepository.create({
          exercise: { id: serieDto.exercise.id },
          reps: serieDto.reps.map((repDto) =>
            this.repRepository.create(repDto),
          ),
        });
        return serie;
      }),
    });

    return this.workoutRepository.save(workout);
  }

  async update(id: string, workoutDto: UpdateWorkoutDto): Promise<Workout> {
    const updatedWorkout = await this.workoutRepository.findOneBy({ id: id });
    updatedWorkout.name = workoutDto.name;
    updatedWorkout.finish_at = workoutDto.finish_at;

    return await this.workoutRepository.save(updatedWorkout);
  }

  async remove(id: string): Promise<void> {
    const workout = await this.workoutRepository.findOne({
      where: { id },
      relations: ['series'],
    });

    if (!workout) {
      throw new NotFoundException(`Workout with id ${id} not found.`);
    }

    await this.workoutRepository.remove(workout);
  }
}

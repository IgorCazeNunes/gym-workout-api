import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout } from './entities/workout.entity';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workout)
    private readonly workoutRepository: Repository<Workout>,
  ) {}

  async findAll(): Promise<Workout[]> {
    return await this.workoutRepository.find({ relations: ['series'] });
  }

  async findOne(id: string): Promise<Workout> {
    return await this.workoutRepository.findOne({
      where: { id },
      relations: ['series'],
    });
  }

  async create(workoutDto: CreateWorkoutDto): Promise<Workout> {
    const newWorkout = new Workout();
    newWorkout.name = workoutDto.name;
    newWorkout.finish_at = workoutDto.finish_at;

    return await this.workoutRepository.save(newWorkout);
  }

  async update(id: string, workoutDto: UpdateWorkoutDto): Promise<Workout> {
    const updatedWorkout = await this.workoutRepository.findOneBy({ id: id });
    updatedWorkout.name = workoutDto.name;
    updatedWorkout.finish_at = workoutDto.finish_at;

    return await this.workoutRepository.save(updatedWorkout);
  }

  async remove(id: string): Promise<void> {
    await this.workoutRepository.delete(id);
  }
}
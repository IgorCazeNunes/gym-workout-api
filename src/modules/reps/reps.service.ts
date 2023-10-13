import { Injectable } from '@nestjs/common';
import { CreateRepDto } from './dto/create-rep.dto';
import { UpdateRepDto } from './dto/update-rep.dto';
import { Rep } from './entities/rep.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RepsService {
  constructor(
    @InjectRepository(Rep)
    private readonly repsRepository: Repository<Rep>,
  ) {}

  async findAll(): Promise<Rep[]> {
    return await this.repsRepository.find();
  }

  async findOne(id: string): Promise<Rep> {
    return await this.repsRepository.findOneBy({ id: id });
  }

  async create(createRepDto: CreateRepDto): Promise<Rep> {
    const rep = this.repsRepository.create(createRepDto);
    return await this.repsRepository.save(rep);
  }

  async update(id: string, updateRepDto: UpdateRepDto): Promise<Rep> {
    await this.repsRepository.update(id, updateRepDto);
    return this.repsRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.repsRepository.delete(id);
  }
}

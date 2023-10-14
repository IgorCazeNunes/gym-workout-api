import { Injectable } from '@nestjs/common';
import { CreateRepDto } from './dto/create-rep.dto';
import { UpdateRepDto } from './dto/update-rep.dto';
import { Rep } from './entities/rep.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Serie } from '../series/entities/series.entity';

@Injectable()
export class RepsService {
  constructor(
    @InjectRepository(Rep)
    private readonly repsRepository: Repository<Rep>,

    @InjectRepository(Serie)
    private readonly seriesRepository: Repository<Serie>,
  ) {}

  async findAll(): Promise<Rep[]> {
    return await this.repsRepository.find();
  }

  async findOne(id: string): Promise<Rep> {
    return await this.repsRepository.findOneBy({ id: id });
  }

  async create(createRepDto: CreateRepDto): Promise<Rep> {
    const { kg, qty, serieId } = createRepDto;
    const serie = await this.seriesRepository.findOneBy({ id: serieId });

    const newRep = new Rep();
    newRep.kg = kg;
    newRep.qty = qty;
    newRep.serie = serie;

    return await this.repsRepository.save(newRep);
  }

  async update(id: string, updateRepDto: UpdateRepDto): Promise<Rep> {
    const { kg, qty, serieId } = updateRepDto;
    const serie = await this.seriesRepository.findOneBy({ id: serieId });

    const updatedRep = await this.repsRepository.findOneBy({ id: id });
    updatedRep.kg = kg;
    updatedRep.qty = qty;
    updatedRep.serie = serie;

    console.log({ id, updateRepDto, serie, updatedRep });

    return await this.repsRepository.save(updatedRep);
  }

  async remove(id: string): Promise<void> {
    await this.repsRepository.delete(id);
  }
}

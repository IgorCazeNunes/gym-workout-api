import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable()
export class ExercisesService {
  create(createExerciseDto: CreateExerciseDto) {
    return 'This action adds a new exercise';
  }

  findAll() {
    return [
      {
        id: 'apsdokpok',
        nome: 'EXERCICIO TESTE 01',
        imagem:
          'https://treinomestre.com.br/wp-content/uploads/2017/02/quanto-peso-usar-no-exercicio-musculacao.jpg',
      },
      {
        id: 'apsdokpok0',
        nome: 'EXERCICIO TESTE 02',
        imagem:
          'https://treinomestre.com.br/wp-content/uploads/2017/02/quanto-peso-usar-no-exercicio-musculacao.jpg',
      },
    ];
  }

  findOne(id: number) {
    return `This action returns a #${id} exercise`;
  }

  update(id: number, updateExerciseDto: UpdateExerciseDto) {
    return `This action updates a #${id} exercise`;
  }

  remove(id: number) {
    return `This action removes a #${id} exercise`;
  }
}

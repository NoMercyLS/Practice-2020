import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotebookEntity } from '../entities/notebook.entity';
import { DateUtils } from 'typeorm/util/DateUtils';
import { NotebookDto } from '../dto/notebook.dto';

type TSortParams = { [n in keyof Pick<NotebookEntity, 'date' | 'id'>]: 'ASC' | 'DESC' }

@Injectable()
export class NotebookService {
  constructor(
    @InjectRepository(NotebookEntity)
    private notebookRepository: Repository<NotebookEntity>,
  ) {}

  async findAll(order: TSortParams): Promise<NotebookEntity[]> {
    return this.notebookRepository.find( {order: order} );
  }

  async findOne(id: number): Promise<NotebookEntity> {
    return this.notebookRepository.findOne({
      where: {
        id,
      },
    });
  }

  async create(record: NotebookDto): Promise<NotebookEntity> {
    return this.notebookRepository.save(record);
  }

  async update(record: NotebookDto): Promise<NotebookEntity> {
    return this.notebookRepository.save(record);
  }

  async remove(id: number): Promise<void> {
    await this.notebookRepository.delete(id);
  }
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotebookEntity } from '../entities/notebook.entity';

@Injectable()
export class NotebookService {
  constructor(
    @InjectRepository(NotebookEntity)
    private notebookRepository: Repository<NotebookEntity>,
  ) {}

  async findAll(): Promise<NotebookEntity[]> {
    return this.notebookRepository.find();
  }

  findOne(id: number): Promise<NotebookEntity> {
    return this.notebookRepository.findOne({
      where: {
        id,
      },
    });
  }

  create(record: NotebookEntity): Promise<NotebookEntity> {
    delete record.id;
    return this.notebookRepository.save(record);
  }

  async update(record: NotebookEntity): Promise<NotebookEntity> {
    return this.notebookRepository.save(record);
  }

  async remove(id: number): Promise<void> {
    await this.notebookRepository.delete(id);
  }
}
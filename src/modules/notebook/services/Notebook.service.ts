import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotebookEntity } from '../entities/notebook.entity';
import { DateUtils } from 'typeorm/util/DateUtils';

type TSortParams = { [n in keyof Pick<NotebookEntity, 'date' | 'id'>]: 'ASC' | 'DESC' }

@Injectable()
export class NotebookService {
  constructor(
    @InjectRepository(NotebookEntity)
    private notebookRepository: Repository<NotebookEntity>,
  ) {}

  findAll(order: TSortParams): Promise<NotebookEntity[]> {
    return this.notebookRepository.find({order});
  }

  findOne(id: number): Promise<NotebookEntity> {
    return this.notebookRepository.findOne({
      where: {
        id,
      },
    });
  }

  async create(record: NotebookEntity): Promise<NotebookEntity> {
    delete record.id;
    record.date = DateUtils.mixedDateToDate(record.date)
    try {
      return await this.notebookRepository.save(record);
    }
    catch (e) {
      console.log("Incorrect data format. Usage: YYYY-MM-DD\n");
      throw new BadRequestException("Incorrect data format. Usage: YYYY-MM-DD\n");
    }
  }

  update(record: NotebookEntity): Promise<NotebookEntity> {
    return this.notebookRepository.save(record);
  }

  async remove(id: number): Promise<void> {
    await this.notebookRepository.delete(id);
  }

  async findAsc(): Promise<NotebookEntity[]> {
    return await this.notebookRepository.find({order: {date: 1}})
  }

  async findDesc(): Promise<NotebookEntity[]> {
    return await this.notebookRepository.find({order: {date: -1}})
  }
}
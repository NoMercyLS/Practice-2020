import {
  BadRequestException, Body, Controller, Delete,
  Get, NotFoundException, Param, ParseIntPipe,
  Post, Put, Query, UseInterceptors,
} from '@nestjs/common';
import { NotebookEntity } from '../entities/notebook.entity';
import { NotebookService } from '../services/notebook.service';
import { DateUtils } from 'typeorm/util/DateUtils';
import { NotebookDto, NotebookResponseDto } from '../dto/notebook.dto';
import { ExceptionInterceptor } from '../interceptors/notebook.interceptor';

type TSortParams = { [n in keyof Pick<NotebookEntity, 'date' | 'id'>]: 'ASC' | 'DESC' }

@UseInterceptors(ExceptionInterceptor)
@Controller('records')
export class NotebookController {

  constructor(private readonly notebookService: NotebookService) {}

  // Get all records
  @Get()
  async getAllRecords(@Query() sort: TSortParams): Promise<NotebookResponseDto[]> {
    return await this.notebookService.findAll(sort)
  }

  //Get one record by id
  @Get(':id')
  async getOneRecord(@Param('id') id: number): Promise<NotebookResponseDto> {
    return await this.notebookService.findOne(id);
  }

  //Update record by id
  @Put(':id')
  async updateRecords(
    @Param('id') id: number,
    @Body() notebookDto: NotebookDto
  ) : Promise<NotebookDto> {
    await this.notebookService.update(id, notebookDto);
    return await this.notebookService.findOne(id);
  }

  //Create new record
  @Post()
  async saveRecord(@Body() record: NotebookDto): Promise<NotebookDto> {

      return await this.notebookService.create(record);
  }

  //Delete record by id
  @Delete(':id')
  async deleteRecord(@Param('id') id: number): Promise<void> {
      return await this.notebookService.remove(id);
  }

}

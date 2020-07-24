import {
  BadRequestException, Body, Controller, Delete,
  Get, NotFoundException, Param,
  Post, Put, Query,
} from '@nestjs/common';
import { NotebookEntity } from '../entities/notebook.entity';
import { NotebookService } from '../services/notebook.service';
import { DateUtils } from 'typeorm/util/DateUtils';
import { NotebookDto, NotebookResponseDto } from '../dto/notebook.dto';

type TSortParams = { [n in keyof Pick<NotebookEntity, 'date' | 'id'>]: 'ASC' | 'DESC' }

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
    const record = await this.notebookService.findOne(id);
    if (record == undefined) {
      console.log("404 - Not Found!\n")
      throw new NotFoundException("Record with ID(" + id + ") not found!\n");
    }
    return record;
  }

  //Update record by id
  @Put(':id')
  async updateRecords(
    @Param('id') id: number,
    @Body() { firstName, lastName, phoneNumber, description, date }: NotebookDto
  ) : Promise<NotebookDto> {
    const record = await this.notebookService.findOne(id);
    if (record == undefined)
    {
      console.log("404 - Not Found!\n")
      throw new NotFoundException("Record with ID(" + id + ") not found!\n");
    }
    record.date = date;
    record.firstName = firstName;
    record.lastName = lastName;
    record.phoneNumber = phoneNumber;
    record.description = description;
    return await this.notebookService.update(record);
  }

  //Create new record
  @Post()
  async saveRecord(@Body() record: NotebookDto): Promise<NotebookDto> {
    if (record.date == undefined || record.description == undefined ||
      record.phoneNumber == undefined || record.lastName == undefined ||
      record.firstName == undefined) {
      console.log("ERROR\nOne or more of the fields are undefined");
      throw new BadRequestException("One or more fields are undefined\n");
    }
    record.date = DateUtils.mixedDateToDate(record.date)
    try {
      return await this.notebookService.create(record);
    }
    catch (e) {
      console.log("Incorrect data format. Usage: YYYY-MM-DD\n");
      throw new BadRequestException("Incorrect data format. Usage: YYYY-MM-DD\n");
    }
  }

  //Delete record by id
  @Delete(':id')
  async deleteRecord(@Param('id') id: number): Promise<void> {
    if (await this.notebookService.findOne(id) != undefined)
    {
      return await this.notebookService.remove(id);
    }
    throw new NotFoundException("Records with ID(" + id + ") not found!\n");
  }

}

import {
  BadRequestException, Body, Controller, Delete,
  Get, NotFoundException, Param,
  Post, Put, Query,
} from '@nestjs/common';
import { NotebookEntity } from '../entities/notebook.entity';
import { NotebookService } from '../services/notebook.service';
import { DateUtils } from 'typeorm/util/DateUtils';
import { CreateNotebookDto, UpdateNotebookDto } from '../dto/notebook.dto';

type TSortParams = { [n in keyof Pick<NotebookEntity, 'date' | 'id'>]: 'ASC' | 'DESC' }

@Controller('records')
export class NotebookController {

  constructor(private readonly notebookService: NotebookService) {}

  // Get all records
  @Get()
  async getAllRecords(@Query() sort: TSortParams): Promise<CreateNotebookDto[]> {
    return await this.notebookService.findAll(sort as any)
  }

  //Get one record by id
  @Get(':id')
  async getOneRecord(@Param('id') id: number): Promise<CreateNotebookDto> {
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
    @Body() { firstName, lastName, phoneNumber, description, date }: UpdateNotebookDto
  ) : Promise<NotebookEntity> {
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
    console.log("Updated\n");
    return await this.notebookService.update(record);
  }

  //Create new record
  @Post()
  async saveRecord(@Body() record: CreateNotebookDto): Promise<UpdateNotebookDto> {
    if (record.date == undefined || record.description == undefined ||
      record.phoneNumber == undefined || record.lastName == undefined ||
      record.firstName == undefined) {
      console.log("ERROR\nOne or more of the fields are undefined");
      console.log(record);
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
    if (this.notebookService.findOne(id) != undefined)
    {
      console.log(id);
      return this.notebookService.remove(id);
    }
    throw await new NotFoundException("Records with ID(" + id + ") not found!\n");
  }

}

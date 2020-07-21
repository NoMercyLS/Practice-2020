import {
  BadRequestException, Body, Controller, Delete,
  Get, NotFoundException, Param,
  Post, Put, Query,
} from '@nestjs/common';
import { NotebookEntity } from '../entities/notebook.entity';
import { NotebookService } from '../services/Notebook.service';

@Controller('notebook/records')
export class NotebookController {

  constructor(private readonly notebookService: NotebookService) {}

  // Get all records
  @Get()
  async getAllRecords(@Query() sort: object): Promise<NotebookEntity[]> {
    return await this.notebookService.findAll(sort as any)
  }

  //Get one record by id
  @Get(':id')
  async getOneRecord(@Param('id') id: number): Promise<NotebookEntity> {
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
    @Body() { firstName, lastName, phoneNumber, description, date }: NotebookEntity
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
  saveRecord(@Body() record: NotebookEntity): Promise<NotebookEntity> {
    if (record.date == undefined || record.description == undefined ||
      record.phoneNumber == undefined || record.lastName == undefined ||
      record.firstName == undefined) {
      console.log("ERROR\nOne or more of the fields are undefined");
      console.log(record);
      throw new BadRequestException("One or more fields are undefined\n");
    }
    console.log("Added\n");
    return this.notebookService.create(record);
  }

  //Delete record by id
  @Delete(':id')
  deleteRecord(@Param('id') id: number): Promise<void> {
    if (this.notebookService.findOne(id) != undefined)
    {
      console.log(id);
      return this.notebookService.remove(id);
    }
    throw new NotFoundException("Records with ID(" + id + ") not found!\n");
  }

}

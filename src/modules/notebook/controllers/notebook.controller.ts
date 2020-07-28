import {
  Body, Controller, Delete,
  Get, HttpException, NotFoundException, Param, ParseIntPipe,
  Post, Put, Query, UseFilters, UseInterceptors,
} from '@nestjs/common';
import { NotebookEntity } from '../entities/notebook.entity';
import { NotebookService } from '../services/notebook.service';
import { NotebookDto, NotebookResponseDto } from '../dto/notebook.dto';
import { ExceptionInterceptor } from '../interceptors/notebook.interceptor';
import { ApiBody, ApiTags, ApiResponse } from '@nestjs/swagger';
import { ExceptionDto } from '../dto/exception.dto';

type TSortParams = { [n in keyof Pick<NotebookEntity, 'date' | 'id'>]: 'ASC' | 'DESC' }

@ApiTags('records')
@UseInterceptors(ExceptionInterceptor)
@Controller('records')
export class NotebookController {

  constructor(private readonly notebookService: NotebookService) {}

  // Get all records
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Find all records ordered by id or date',
    type: [NotebookResponseDto]
  })
  async getAllRecords(@Query() sort: TSortParams): Promise<NotebookResponseDto[]> {
    return await this.notebookService.findAll(sort)
  }

  //Get one record by id
  @Get(':id')
  @ApiResponse({ status: 200,
    description: 'Find one record by ID',
    type: NotebookResponseDto
  })
  @ApiResponse({ status: 404,
    description: 'Record not found! Try another ID',
    type: ExceptionDto
  })
  async getOneRecord(@Param('id', ParseIntPipe) id: number): Promise<NotebookResponseDto> {
    return await this.notebookService.findOne(id);
  }

  //Update record by id
  @Put(':id')
  @ApiResponse({ status: 200,
    description: 'Update one record by ID',
    type: NotebookDto
  })
  @ApiResponse({ status: 404,
    description: 'Record not found! Try another ID',
    type: ExceptionDto
  })
  @ApiBody({ type: NotebookDto })
  async updateRecords(
    @Param('id', ParseIntPipe) id: number,
    @Body() notebookDto: NotebookDto
  ) : Promise<NotebookDto> {
    await this.notebookService.update(id, notebookDto);
    return await this.notebookService.findOne(id);
  }

  //Create new record
  @Post()
  @ApiResponse({ status: 201,
    description: 'Create record',
    type: NotebookDto
  })
  @ApiBody({ type: NotebookDto })
  async saveRecord(@Body() record: NotebookDto): Promise<NotebookDto> {
      return await this.notebookService.create(record);
  }

  //Delete record by id
  @Delete(':id')
  @ApiResponse({ status: 200,
    description: 'Record deleted'
  })
  @ApiResponse({ status: 404,
    description: 'Record not found! Try another ID',
    type: ExceptionDto
  })
  async deleteRecord(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    const result = await this.notebookService.remove(id);
    return result.affected ? {message: 'Record with ID = ' + id + ' was successfully deleted'} : null;
  }

}

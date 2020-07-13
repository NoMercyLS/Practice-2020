import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotebookEntity } from './entities/notebook.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotebookEntity])],
  controllers: [],
  providers: [],
})
export class NotebookModule {}
      
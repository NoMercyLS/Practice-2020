import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotebookEntity } from './entities/notebook.entity';
import { NotebookController } from './controllers/notebook.controller';
import { NotebookService } from './services/Notebook.service';

@Module({
  imports: [TypeOrmModule.forFeature([NotebookEntity])],
  controllers: [NotebookController],
  providers: [NotebookService],
})

export class NotebookModule {}


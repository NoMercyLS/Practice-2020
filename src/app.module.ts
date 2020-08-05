import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotebookModule } from './modules/notebook/notebook.module';

@Module({
  imports: [TypeOrmModule.forRoot(), NotebookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

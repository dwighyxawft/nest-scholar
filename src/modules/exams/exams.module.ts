import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExamSchema } from './schema/exam.schema';
import { ProgramModule } from '../program/program.module';
import { CoursesModule } from '../courses/courses.module';

@Module({
  controllers: [ExamsController],
  providers: [ExamsService],
  imports: [MongooseModule.forFeature([
    {
      name: "Exam",
      schema: ExamSchema
    }
  ]), ProgramModule, CoursesModule],
  exports: [ExamsService]
})
export class ExamsModule {}

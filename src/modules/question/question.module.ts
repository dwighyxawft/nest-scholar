import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionSchema } from './schema/question.schema';
import { ExamsModule } from '../exams/exams.module';
import { OptionModule } from '../option/option.module';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService],
  imports: [MongooseModule.forFeature([
    {
      name: "Question",
      schema: QuestionSchema
    }
  ]), ExamsModule, OptionModule],
  exports: [QuestionService]
})
export class QuestionModule {}

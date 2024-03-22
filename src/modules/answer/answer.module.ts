import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswerSchema } from './schema/answer.answer';
import { QuestionModule } from '../question/question.module';
import { ExamsModule } from '../exams/exams.module';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService],
  imports: [
    MongooseModule.forFeature([
      {
        name: "Answer",
        schema: AnswerSchema
      }
    ]), QuestionModule, ExamsModule
  ]
})
export class AnswerModule {}

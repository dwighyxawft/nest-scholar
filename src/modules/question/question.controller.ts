import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post("create")
  public async create(@Body() question: {question: string, exam_id: string}) {
    return this.questionService.createQuestion(question);
  }

  @Get("questions")
  findAll() {
    return this.questionService.getAllQuestions();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.questionService.getQuestionById(id);
  }

  @Get('exam/:id')
  findByExam(@Param('id') id: string) {
    return this.questionService.getQuestionByExam(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() question: {question: string}) {
    return this.questionService.update(id, question.question);
  }

  @Delete(':id')
  removeById(@Param('id') id: string) {
    return this.questionService.removeById(id);
  }

  @Delete('exam/:id')
  removeByExam(@Param('id') id: string) {
    return this.questionService.removeByExam(id);
  }
}

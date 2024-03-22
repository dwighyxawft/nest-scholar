import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Request } from 'express';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post("create")
  create(@Body() createAnswerDto: CreateAnswerDto, @Req() req: Request) {
    return this.answerService.create(req["user"]["sub"], createAnswerDto);
  }

  @Get('exam/:id')
  findOne(@Param('id') id: string) {
    return this.answerService.getAllExamAnswers(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto, @Req() req: Request) {
    return this.answerService.update(req["user"]["sub"], id, updateAnswerDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.answerService.remove(id, req['user']["sub"]);
  }
}

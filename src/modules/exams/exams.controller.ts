import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post("create")
  create(@Body() createExamDto: CreateExamDto) {
    return this.examsService.createExam(createExamDto);
  }

  @Get()
  findAll() {
    return this.examsService.getAllExams();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examsService.getExamById(id);
  }

  @Get('course/:id')
  findByCourse(@Param('id') id: string) {
    return this.examsService.getExamsByCourse(id);
  }

  @Get('program/:id')
  findOneByProgram(@Param('id') id: string) {
    return this.examsService.getExamByProgram(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto) {
    return this.examsService.updateExam(id, updateExamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examsService.remove(id);
  }

  @Delete('program/:id')
  deleteByProgram(@Param('id') id: string) {
    return this.examsService.deleteByProgram(id);
  }

  @Delete('course/:id')
  deleteByCourse(@Param('id') id: string) {
    return this.examsService.deleteByCourse(id);
  }
}

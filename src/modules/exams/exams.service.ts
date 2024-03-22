import { Injectable } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import * as nodemailer from "nodemailer";
import { IExam } from './interface/exam.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoursesService } from '../courses/courses.service';
import { ProgramService } from '../program/program.service';

@Injectable()
export class ExamsService {
  private transporter: nodemailer.Transporter;
  constructor(@InjectModel("Exam") private readonly examModel: Model<IExam>, private courseService: CoursesService, private programService: ProgramService){
    this.transporter = nodemailer.createTransport({
      host: 'smtp-relay.sendinblue.com', // Your SMTP server host
      port: 587, // Your SMTP server port
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'amuoladipupo@gmail.com', // Your SMTP username
        pass: 'bXfgDO2VMpZGFE19', // Your SMTP password
      },
    })
  }
  public async createExam(exam: CreateExamDto){
    const program = await this.programService.getProgramById(exam.program_id);
    const course = await this.courseService.getCourseById(exam.course_id);
    if(course && program){
      const newExam = await new this.examModel(exam);
      return await newExam.save();
    }
  }

  public async getAllExams() {
    return await this.examModel.find().exec();
  }

  public async getExamById(id: string) {
    return await this.examModel.findOne({_id: id}).exec();
  }

  public async getExamsByCourse(course_id: string){
    return await this.examModel.find({course_id: course_id}).exec();
  }

  public async getExamByProgram(program_id: string){
    return await this.examModel.findOne({program_id: program_id}).exec();
  }

  public async updateExam(id: string, exam: UpdateExamDto) {
    return await this.examModel.updateOne({_id: id}, exam).exec();
  }

  public async remove(id: string) {
    return await this.examModel.deleteOne({_id: id}).exec();
  }

  public async deleteByCourse(course_id: string){
    return await this.examModel.deleteMany({course_id: course_id}).exec();
  }

  public async deleteByProgram(program_id: string){
    return await this.examModel.deleteOne({program_id: program_id}).exec();
  }
}

import { Injectable } from '@nestjs/common';
import * as nodemailer from "nodemailer";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IQuestion } from './interface/question.interface';
import { ExamsService } from '../exams/exams.service';
import { Question } from './schema/question.schema';
import { OptionService } from '../option/option.service';

@Injectable()
export class QuestionService {
  private transporter: nodemailer.Transporter;
  constructor(@InjectModel("Question") private readonly questionModel: Model<IQuestion>, private examService: ExamsService, private optionService: OptionService){
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
  public async createQuestion(question: {question: string, exam_id: string}): Promise<Question | {message: string}> {
    const exam = await this.examService.getExamById(question.exam_id);
    if(exam){
      const newQuestion = await new this.questionModel(question);
      return await newQuestion.save();
    }else{
      return {message: "Exam does not exist"};
    }
  }

  public async getAllQuestions() {
    const questions = await this.questionModel.find().exec();
    let arr: {question: string, option: {}}[] = [];
    await questions.forEach(async question => {
      const option = await this.optionService.findByQuestionId(question._id);
      delete option.question_id;
      let details = {question: question.question, option};
      arr.push(details);
    })
    return arr;
  }

  public async getQuestionById(id: string) {
    const question = await this.questionModel.findOne({_id: id}).exec();
    const options = await this.optionService.findByQuestionId(id);
    return {question, options}
  }

  public async getQuestionByExam(id) {
    const questions = await this.questionModel.find({exam_id: id}).exec();
    let arr: {question: string, option: {}}[] = [];
    await questions.forEach(async question => {
      const option = await this.optionService.findByQuestionId(question._id);
      delete option.question_id;
      let details = {question: question.question, option: option};
      arr.push(details);
    })
    return arr;
  }

  public async update(id: string, question: string) {
    return await this.questionModel.updateOne({_id: id}, {question: question}).exec();
  }

  public async removeById(id: string) {
    return await this.questionModel.deleteOne({_id: id}).exec();
  }

  public async removeByExam(id: string) {
    return await this.questionModel.deleteOne({exam_id: id}).exec();
  }
}

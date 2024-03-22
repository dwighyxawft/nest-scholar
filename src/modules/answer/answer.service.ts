import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import * as nodemailer from "nodemailer";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAnswer } from "./interface/answer.interface";
import { QuestionService } from '../question/question.service';
import { ExamsService } from '../exams/exams.service';

@Injectable()
export class AnswerService {
  private transporter: nodemailer.Transporter;
  constructor(@InjectModel("Answer") private readonly answerModel: Model<IAnswer>, private questionService: QuestionService, private examService: ExamsService){
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
  public async create(id: string, answer: CreateAnswerDto) {
    const question = await this.questionService.getQuestionById(answer.question_id);
    if(question){
      const exam = await this.examService.getExamById(question.question.exam_id);
      answer.user_id = id;
      if(exam.exam_type == "objective"){
        delete answer.answer;
        const newAnswer = await new this.answerModel(answer);
        return await newAnswer.save();
      }else if(exam.exam_type == "theory"){
        delete answer.option;
        const newAnswer = await new this.answerModel(answer);
        return await newAnswer.save();
      }
    }else{
      return {message: "Question does not exist"}
    }

  }

  public async getAllExamAnswers(id: string) {
    const exam = await this.examService.getExamById(id);
    const questions = await this.questionService.getQuestionByExam(exam._id);
    return questions;
  }

  public async update(user_id: string, id: string, answer: UpdateAnswerDto) {
    const question = await this.questionService.getQuestionById(id);
    const exam = await this.examService.getExamById(question.question.exam_id);
    if(exam.exam_type == "objective"){
        return await this.answerModel.updateOne({$and: [{user_id: {$eq: user_id}}, {question_id: {$eq: id}}]}, {option: answer.option}).exec();
    }else if(exam.exam_type == "theory"){
      return await this.answerModel.updateOne({$and: [{user_id: {$eq: user_id}}, {question_id: {$eq: id}}]}, {answer: answer.answer}).exec();
    }
  }

  public async remove(id: string, user_id: string) {
    return await this.answerModel.deleteOne({$and: [{question_id: {$eq: id}}, {user_id: {$eq: user_id}}]}).exec();
  }
}

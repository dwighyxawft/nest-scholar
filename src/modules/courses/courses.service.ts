import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ICourse } from './interface/course.interface';
import * as nodemailer from "nodemailer";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from 'express';
import { Course } from './schema/course.schema';

@Injectable()
export class CoursesService {
  private transporter: nodemailer.Transporter;
  constructor(@InjectModel("Course") private readonly courseModel: Model<ICourse>){
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
  public async createCourse(course: CreateCourseDto, id: string, file: Express.Multer.File) {
    if(Date.now() < course.startDate.getTime()){
      course.tutorId = id;
      const lastDayOfPayment = course.daysToFinish / 2;
      const ldop_ms = (1000 * 60 * 60 * 24) * lastDayOfPayment;
      const startDate = new Date(course.startDate);
      const startDateMs = startDate.getTime();
      const daystoMS = (1000 * 60 * 60 * 24) * course.daysToFinish;
      const newDateMS = startDateMs + daystoMS;
      const last_dop = startDateMs + ldop_ms;
      const end_date_of_pay = new Date(last_dop);
      const endDate = new Date(newDateMS)
      course.endDate = endDate;
      course.image = file.originalname;
      course.lastDayOfPayment = end_date_of_pay;
      const newCourse = await new this.courseModel(course);
      if(await newCourse.save()){
        return {message: "Course has been uploaded successfully"}
      }
    }else{
      return {message: "Please a date from tomorrow"}
    }
  }

  public async getCourses(): Promise<Course[] | undefined> {
    return await this.courseModel.find().exec()
  }

  public async getCourseById(id: string): Promise<Course | undefined> {
    const course = await this.courseModel.findOne({_id: id}).exec();
    return course;
  }

  public async updateCourseInfo(id: string, course: UpdateCourseDto, file: Express.Multer.File, tutor:string) {
    const program = await this.getCourseById(id);
    if(program){
      course.tutorId = tutor;
      const startDate = new Date(course.startDate);
      const startDateMs = startDate.getTime();
      const daystoMS = (1000 * 60 * 60 * 24) * course.daysToFinish;
      const newDateMS = startDateMs + daystoMS;
      const endDate = new Date(newDateMS)
      course.endDate = endDate;
      course.image = file.originalname;
      if(await this.courseModel.updateOne({_id: id}, course).exec()){
        return {message: "Course updated successfully"};
      }
    }else{
      return {message: "Course not found"};
    }
  }

  public async deleteCourse(id: string) {
    return await this.courseModel.deleteOne({_id: id}).exec();
  }
}

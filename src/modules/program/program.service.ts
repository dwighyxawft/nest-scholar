import { Injectable } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramInfoDto } from './dto/update-program-info.dto';
import { UpdateTimetableDto } from './dto/update-timetable.dto';
import * as nodemailer from "nodemailer";
import { IProgram } from './interface/program.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CoursesService } from '../courses/courses.service';
import { Program } from './schema/program.schema';

@Injectable()
export class ProgramService {
    private transporter: nodemailer.Transporter;
    constructor(@InjectModel("Program") private readonly programModel: Model<IProgram>, private courseService: CoursesService){
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

    public async createProgram(program: CreateProgramDto){
        const course = await this.courseService.getCourseById(program.course_id);
        if(course){
            program.course_id = course._id;
            program.instructor = course.tutorId;
            const newProgram = await new this.programModel(program);
            if(await newProgram.save()){
                return {message: "Program has been added successfully"};
            }
        }else{
            return {message: "Course does not exist"};
        }
    }

    public async getProgramById(id: string): Promise<Program | undefined>{
        return await this.programModel.findOne({_id: id}).exec();
    }

    public async getProgramsByCourseId(id: string): Promise<Program[] | undefined>{
        return await this.programModel.find({course_id: id}).exec();
    }

    public async getPrograms(): Promise<Program[] | undefined>{
        return await this.programModel.find().exec();
    }

    public async updateProgramInfo(id: string, course: string, program: UpdateProgramInfoDto){
        if(await this.programModel.updateOne({$and: [{_id: {$eq: id}}, {course_id: {$eq: course}}]}, program)){
            return {message: "Program updated successfully"}
        }
    }

    public async updateTimetable(id: string, course: string, program: UpdateTimetableDto){
        if(await this.programModel.updateOne({$and: [{_id: {$eq: id}}, {course_id: {$eq: course}}]}, program)){
            return {message: "Timetable updated successfully"}
        }
    }

    public async deleteProgram(id: string, course: string){
        if(await this.programModel.deleteOne({$and: [{_id: {$eq: id}}, {course_id: {$eq: course}}]})){
            return {message: "Program deleted successfully"}
        }
    }
}

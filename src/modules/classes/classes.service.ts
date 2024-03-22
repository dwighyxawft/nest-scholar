import { Inject, Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import * as nodemailer from "nodemailer";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IClass } from './interface/classes.interface';
import { Response } from 'express';

@Injectable()
export class ClassesService {
  private transporter: nodemailer.Transporter;
  constructor(@InjectModel("Class") private readonly classModel: Model<IClass>){
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
  public async create(id: string, classes: CreateClassDto, res: Response) {
    classes.duration = 1;
    const newClass = await new this.classModel(classes);
    if(await newClass.save()){
      res.redirect('/class/'+newClass._id);
    }
  }

  public async findAll(id: string) {
    return await this.classModel.find({tutor_id: id}).exec();
  }

  public async findOne(id: string) {
    return await this.classModel.findOne({_id: id}).exec();
  }

  public async update(user_id: string, id: string, classes: UpdateClassDto) {
    return await this.classModel.updateOne({$and: [{tutor_id: {$eq: user_id}}, {_id: {$eq: id}}]}).exec();
  }

}

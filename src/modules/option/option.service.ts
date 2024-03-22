import { Injectable } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IOption } from './interface/option.interface';
import * as nodemailer from "nodemailer";

@Injectable()
export class OptionService {
  private transporter: nodemailer.Transporter;
  constructor(@InjectModel("Option") private readonly optionModel: Model<IOption>){
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
  public async create(option: CreateOptionDto) {
      const newOption = await new this.optionModel(option);
      return await newOption.save();
  }

  public async findByQuestionId(id) {
    return await this.optionModel.findOne({question_id: id}).exec();
  }

  public async update(id: string, option: UpdateOptionDto) {
    return await this.optionModel.updateOne({question_id: id}, option).exec();
  }

  public async remove(id: string) {
    return await this.optionModel.deleteOne({question_id: id}).exec();
  }
}

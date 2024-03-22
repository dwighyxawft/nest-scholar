import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";

@Schema()
export class Course extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  image: string;

  @Prop({ required: true })
  tutorId: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  daysToFinish: number;

  @Prop({ default: null })
  endDate: Date;

  @Prop({ required: true })
  lastDayOfPayment: Date;

  @Prop({ required: true })
  amount: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

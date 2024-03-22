import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Exam extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  tutor_id: string;

  @Prop({ required: true })
  course_id: string;

  @Prop({ required: true })
  program_id: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true, enum: ["objective", "theory", "practical"] })
  exam_type: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ExamSchema = SchemaFactory.createForClass(Exam);

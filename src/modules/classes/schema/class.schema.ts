import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Class extends Document {

  @Prop({ required: true })
  tutor_id: string;

  @Prop({ required: true })
  course_id: string;

  @Prop({ required: true })
  program_id: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ClassSchema = SchemaFactory.createForClass(Class);

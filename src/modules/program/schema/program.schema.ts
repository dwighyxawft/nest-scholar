import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Program extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  instructor: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  course_id: string;

  @Prop({
    type: [
      {
        dayOfWeek: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: true },
        time: { type: String, required: true }, // Time format: 'HH:MM' (24-hour format)
      },
    ],
    required: true,
  })
  timetable: { dayOfWeek: string; time: string }[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ProgramSchema = SchemaFactory.createForClass(Program);

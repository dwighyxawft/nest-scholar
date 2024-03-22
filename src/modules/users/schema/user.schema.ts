import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  phoneNumber: string;

  @Prop({ required: true })
  country: string;

  @Prop()
  image: string;

  @Prop({ type: [{ enum: ["male", "female"] }] })
  gender: string;

  @Prop({ default: false })
  verified: boolean;

  @Prop({ type: [{ type: String, ref: 'Course' }] })
  coursesEnrolled: string[];

  @Prop({ type: String, ref: 'Course' })
  activeCourse: string;

  @Prop({ default: false })
  freeCourseUsed: boolean;

  date_ob: Date;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

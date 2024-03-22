import { Document } from 'mongoose';

export interface IClass extends Document {
  tutor_id: string;
  program_id: string;
  duration: number;
  course_id: string;
  createdAt: Date;
  updatedAt: Date;
}

import { Document } from 'mongoose';

export interface IProgram extends Document {
  title: string;
  description: string;
  instructor: string;
  duration: number;
  timetable: { dayOfWeek: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"; time: string }[];
  course_id: string;
  createdAt: Date;
  updatedAt: Date;
}

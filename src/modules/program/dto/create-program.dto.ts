export class CreateProgramDto {
    title: string;
    description: string;
    instructor: string;
    duration: number;
    timetable: { dayOfWeek: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"; time: string }[];
    course_id: string;
  }
  
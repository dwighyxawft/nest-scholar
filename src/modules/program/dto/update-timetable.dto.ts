export class UpdateTimetableDto {
  timetable: { dayOfWeek: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"; time: string }[];
  }
  
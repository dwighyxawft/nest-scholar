export class CreateExamDto {
    name: string;
    tutor_id: string;
    program_id: string;
    course_id: string;
    exam_type: "objective" | "theory" | "practical";
    duration: number;
    date: Date;
}

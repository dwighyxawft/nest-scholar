import { IsNotEmpty, Length } from "class-validator";

export class CreateClassDto {

    @IsNotEmpty()
    @Length(3, 40)
    program_id: string;

    @IsNotEmpty()
    @Length(3, 40)
    course_id: string;

    duration: number;
}

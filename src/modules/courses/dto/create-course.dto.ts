import { IsString, IsNotEmpty, IsOptional, IsArray, IsDateString, IsNumber } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsString()
  tutorId: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsNumber()
  daysToFinish: number;

  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @IsDateString()
  lastDayOfPayment: Date;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}

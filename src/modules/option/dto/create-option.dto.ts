import { IsString, IsNotEmpty } from 'class-validator';

export class CreateOptionDto {
  @IsNotEmpty()
  @IsString()
  question_id: string;

  @IsNotEmpty()
  @IsString()
  option_1: string;
  
  @IsNotEmpty()
  @IsString()
  option_2: string;

  @IsNotEmpty()
  @IsString()
  option_3: string;

  @IsNotEmpty()
  @IsString()
  option_4: string;

  @IsNotEmpty()
  @IsString()
  corrected: string;

  }

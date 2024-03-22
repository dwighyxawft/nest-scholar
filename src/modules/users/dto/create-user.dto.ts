import { Matches, IsString, IsEmail, IsNotEmpty, IsPhoneNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message: "Password must have 1 uppercase, lowercase letter along with a number and a special character"
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message: "Password must have 1 uppercase, lowercase letter along with a number and a special character"
  })
  confirm: string;

  date_ob: Date;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  gender: "male" | "female";

  @IsOptional()
  @IsBoolean()
  verified: boolean;

  @IsOptional()
  @IsBoolean()
  freeCourseUsed: boolean;
}

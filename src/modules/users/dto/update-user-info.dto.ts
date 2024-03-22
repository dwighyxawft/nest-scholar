import {  IsString, IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class UpdateUserInfoDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  date_ob: Date;

  @IsNotEmpty()
  @IsString()
  country: string;

  
}

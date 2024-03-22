import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interface/user.interface';
import IVerify from './interface/verification.interface';
import {v4 as uuidv4} from "uuid"
import * as nodemailer from "nodemailer"
import * as bcrypt from "bcryptjs"
import { User } from './schema/user.schema';
import { UpdateUserPassDto } from './dto/update-user-pass.dto';
import { CoursesService } from '../courses/courses.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TransactionService } from '../transaction/transaction.service';

@Injectable()
export class UsersService {
  private transporter = nodemailer.Transporter;
  constructor(@InjectModel("User") private readonly userModel: Model<IUser>, @InjectModel("Verification") private readonly verifyModel: Model<IVerify>, private courseService: CoursesService, private httpService: HttpService, private transactionService: TransactionService){
    this.transporter = nodemailer.createTransport({
      host: 'smtp-relay.sendinblue.com', // Your SMTP server host
      port: 587, // Your SMTP server port
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'amuoladipupo@gmail.com', // Your SMTP username
        pass: 'bXfgDO2VMpZGFE19', // Your SMTP password
      },
    })
  }
  public async register(userDetails: CreateUserDto) {
    const existingUser = await this.findOne(userDetails.email);
    const uuid = uuidv4();
      if(!existingUser){
        userDetails.image = userDetails.gender == "male" ? "male.jpg" : "female.jpg";
        if(userDetails.password === userDetails.confirm){
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(userDetails.password, salt);
            userDetails.password = hash;
            if(await this.transporter.sendMail({from: 'amuoladipupo420@gmail.com', to: userDetails.email, subject: "Verify your account", text: "Verify your account, If link is not clickable, copy the link and paste it in your browser" + "https://school.onrender.com/user/verify/account/"+uuid})){
              const newUser = new this.userModel(userDetails);
              if(await newUser.save()){
                const newPin = await new this.verifyModel({user_id: newUser._id, uuid: uuid, createdAt: Date.now()});
                if(await newPin.save()){
                  return {message: "User registration successful. Open your email and click the link that has been sent to you"}
                }
              }
            }
        }else{
          return {message: "Passwords are not matching"}
        }
      }else if(existingUser && !existingUser.verified){
        const checkPin = await this.verifyModel.findOne({user_id: existingUser._id}).exec();
        const pin_length = Number(checkPin.createdAt) + (1000 * 60 * 60 * 6);
        if(!checkPin){
          if(await this.transporter.sendMail({from: 'amuoladipupo420@gmail.com', to: existingUser.email, subject: "Verify your account", text: "Verify your account, If link is not clickable, copy the link and paste it in your browser" + "https://shop.onrender.com/user/verify/account/"+uuid})){
            const newPin = await new this.verifyModel({user_id: existingUser._id, uuid: uuid, createdAt: Date.now()});
            if(await newPin.save()){
              return {message: "User registration successful. Open your email and click the link that has been sent to you"}
            }
          }
        }else if(checkPin && Date.now() <= pin_length){
          if(await this.transporter.sendMail({from: 'amuoladipupo420@gmail.com', to: existingUser.email, subject: "Verify your account", text: "Verify your account, If link is not clickable, copy the link and paste it in your browser" + "https://shop.onrender.com/user/verify/account/"+uuid})){
              return {message: "User registration successful. Open your email and click the link that has been sent to you"}
          }
        }else{
          if(await this.transporter.sendMail({from: 'amuoladipupo420@gmail.com', to: existingUser.email, subject: "Verify your account", text: "Verify your account, If link is not clickable, copy the link and paste it in your browser" + "https://shop.onrender.com/user/verify/account/"+uuid})){
            if(await this.verifyModel.updateOne({user_id: existingUser._id}, {uuid: uuid}).exec()){
              return {message: "User registration successful. Open your email and click the link that has been sent to you"}
            }
          }
        }

      }else{
        return {message: "User already exists"};
      }
      
  }

  public async findAll(): Promise<User[] | undefined> {
    const users = await this.userModel.find().exec();
    return users;
  }

  public async findOne(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({email: email}).exec();
    return user;
  }

  public async findByPhone(phone: string): Promise<User[] | undefined> {
    const user = await this.userModel.find({phoneNumber: phone}).exec();
    return user;
  }

  public async findById(id: string): Promise<User | undefined>{
    const user = await this.userModel.findOne({_id: id}).exec();
    return user;
  }

  public async updateInfo(id: string, updateUserDto: UpdateUserInfoDto) {
    const mail_user = await this.userModel.find({email: updateUserDto.email}).exec();
    const phone_user = await this.findByPhone(updateUserDto.phoneNumber);
    if((mail_user.length > 1) && (phone_user.length > 1)){
      if(await this.userModel.updateOne({_id: id}, {updateUserDto})){
        return {message: "Account updated successfully"};
      }
    }else{
      return {message: "Email or Phone has been used by someone else"}
    }
  }

  public async updatePass(id: string, password: UpdateUserPassDto){
    const user = await this.findById(id);
    if(user){
      if(await bcrypt.compare(password.old_pass, user.password)){
        if(password.new_pass === password.confirm_pass){
          const salt = bcrypt.genSalt();
          const hash = bcrypt.hash(password.new_pass, salt);
          if(await this.userModel.updateOne({_id: id}, {password: hash}).exec()){
            return {message: "Password has been updated"}
          }
        }else{
          return {message: "Passwords not matching"}
        }
      }else{
        return {message: 'Password is incorrect'};
      }
    }
  }

  public async enrollCourse(id: string, course: string): Promise<{message: string}>{
    const user = await this.findById(id);
    const program = await this.courseService.getCourseById(course);
    if(user){
      if(program){
        let courses = user.coursesEnrolled;
        if(courses.indexOf(course) == -1){
          if(user.freeCourseUsed){
            if(program.amount > 0){
              if(Date.now() <= program.lastDayOfPayment.getTime()){
                
                  const params = {
                    email: user.email,
                    amount: program.amount + "00",
                  };
              
                  const options = {
                    headers: {
                      Authorization: "Bearer sk_live_58af92d67a993c890713ac20e639ec442169b2ec",
                      'Content-Type': 'application/json',
                    },
                  };
              
                  try {
                    const response = await firstValueFrom(this.httpService.post(
                      'https://api.paystack.co/transaction/initialize',
                      params,
                      options,
                    ))
                      if(response.data.status){
                        const transaction = {
                          reference: response.data.data.reference,
                          user_id: user._id,
                          user_email: user.email,
                          status: "pending",
                          course_id: program._id,
                          tutor_id: program.tutorId
                        };
                        if(await this.transactionService.createTransaction(transaction)){
                          return {message: "Courses enrollment initialized successfully"}
                        }
                      }else{
                        return {message: "Payment initialization not successfully"}
                      }
                  } catch (error) {
                    console.error(error);
                    throw error;
                  }
            
              }else{
                return {message: "Payment for this course is due. Please wait for the next session of this course"}
              }
            }else{
              courses.push(course);
              if(await this.userModel.updateOne({_id: id}, {activeCourse: course, coursesEnrolled: courses}).exec()){
                return {message: "Courses enrolled successfully"}
              }
            }
          }else{
            courses.push(course);
            if(await this.userModel.updateOne({_id: id}, {activeCourse: course, coursesEnrolled: courses, freeCourseUsed: true}).exec()){
              return {message: "Courses enrolled successfully"}
            }
          }
          // courses.push(course);
          // if(await this.userModel.updateOne({_id: id}, {activeCourse: course, coursesEnrolled: courses}).exec()){
          //   return {message: "Courses enrolled successfully"}
          // }
        }else{
          return {message: "You have enrolled for this course"}
        }
      }else{
        return {message: "Course does not exist"}
      }
    }
  }

  public async updateCourse(reference: string){
    const transaction = await this.transactionService.getTransactionByRef(reference);
    const user = await this.findById(transaction.user_id);
    let courses = user.coursesEnrolled;
    if(transaction){
      const options = {
        headers: {
          Authorization: "Bearer sk_live_58af92d67a993c890713ac20e639ec442169b2ec",
        },
      };
      try {
        const response = await firstValueFrom(this.httpService.get(`https://api.paystack.co/transaction/verify/${reference}`,options));
        if (response.data.status && response.data.data.status == "success") {
          if(await this.transactionService.updateTransactionByRef(reference, {status: "completed"})){
              courses.push(transaction.course_id);
              if(await this.userModel.updateOne({_id: transaction.user_id}, {activeCourse: transaction.course_id, coursesEnrolled: courses}).exec()){
                return {message: "Courses enrolled successfully"}
              }
          }
        } else {
          return await this.transactionService.updateTransactionByRef(reference, {status: "failed"})
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }

  public async verifyAccount(uuid: string){
    const checkPin = await this.verifyModel.findOne({uuid: uuid}).exec();
    if(checkPin){
      const pin_length = +checkPin.createdAt + (1000 * 60 * 60 * 6);
      if(Number(Date.now()) <= pin_length){
          if(await this.userModel.updateOne({_id: checkPin.user_id}, {verified: true}).exec()){
            if(await this.verifyModel.deleteOne({user_id: checkPin.user_id}).exec()){
              return {message: "User verification successful. You can now login to your account"}
            }
          }
      }else{
        return {message: "Link expired"};
      }
    }else{
      return {message: "This link does not exist"};
    }
  }

  public async updateImage(id: string, file: Express.Multer.File){
    if(await this.userModel.updateOne({_id: id}, {image: file.originalname}).exec()){
      return {message: "User image uploaded successfully"};
    }
  }

  public async deleteUser(id: string) {
    if(await this.userModel.deleteOne({_id: id}).exec()){
      return {message: "User deleted successfully"};
    }
  }
}

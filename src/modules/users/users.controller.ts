import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { UseInterceptors } from '@nestjs/common';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';
import { UpdateUserPassDto } from './dto/update-user-pass.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("register")
  public async register(@Body() userDetails: CreateUserDto) {
    return await this.usersService.register(userDetails);
  }

  @Get("users")
  public async findAll() {
    return await this.usersService.findAll();
  }

  @Post("find/mail")
  public async findOne(@Body() body: {email: string}) {
    return await this.usersService.findOne(body.email);
  }

  @Post("find/phone")
  public async findByPhone(@Body() body: {phone: string}) {
    return await this.usersService.findByPhone(body.phone);
  }

  @Patch("settings")
  update(@Req() req: Request, @Body() updateUserInfoDto: UpdateUserInfoDto) {
    return this.usersService.updateInfo(req["user"]["sub"], updateUserInfoDto);
  }

  @Get("verify/account/:uuid/")
  public async verifyUser(@Param("uuid") uuid: string){
    return this.usersService.verifyAccount(uuid);
  }

  @Patch("image")
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: "./uploads/users",
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 10);
        const ext = extname(file.originalname);
        const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
        callback(null, filename);
      }
    })
  }))
  image(@UploadedFile() file: Express.Multer.File, @Req() req: Request){
    return this.usersService.updateImage(req["user"]["sub"], file)
  }

  @Patch("enroll/:course")
  course(@Req() req: Request, @Param("course") course: string) {
    return this.usersService.enrollCourse(req["user"]["sub"], course);
  }

  @Get('verify')
  public async updateCourse(@Query('reference') reference: string) {
    return this.usersService.updateCourse(reference);
  }

  @Patch("password")
  password(@Req() req: Request, @Body() updateUserPass: UpdateUserPassDto) {
    return this.usersService.updatePass(req["user"]["sub"], updateUserPass);
  }


  @Delete(':id')
  deleteUser(@Req() req: Request) {
    return this.usersService.deleteUser(req["user"]["sub"]);
  }
}

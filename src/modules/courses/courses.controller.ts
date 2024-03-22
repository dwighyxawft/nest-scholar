import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: "./uploads/courses",
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 10);
        const ext = extname(file.originalname);
        const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
        callback(null, filename);
      }
    })
  }))
  public async createCourse(@UploadedFile() file: Express.Multer.File, @Body() createCourseDto: CreateCourseDto, @Req() req: Request) {
    return this.coursesService.createCourse(createCourseDto, req["user"]["sub"], file);
  }

  @Get()
  public async findAll() {
    return this.coursesService.getCourses();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.coursesService.getCourseById(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: "./uploads/courses",
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 10);
        const ext = extname(file.originalname);
        const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
        callback(null, filename);
      }
    })
  }))
  public async update(@UploadedFile() file: Express.Multer.File, @Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto, @Req() req: Request) {
    return this.coursesService.updateCourseInfo(id, updateCourseDto, file, req["user"]["sub"]);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.coursesService.deleteCourse(id);
  }
}

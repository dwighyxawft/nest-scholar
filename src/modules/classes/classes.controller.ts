import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Request, Response } from 'express';
import { ClassesService } from './classes.service';

@Controller('class')
export class ClassController {
  constructor(private readonly classesService: ClassesService) {}

  @Post("create")
  create(@Body() classes: CreateClassDto, @Req() req: Request, @Res({passthrough: true}) res: Response) {
    return this.classesService.create(req["user"]["sub"], classes, res);
  }

  @Get('')
  findAll(@Req() req: Request) {
    return this.classesService.findAll(req["user"]["sub"]);
  }

  @Get('id')
  findOne(@Param('id') id: string) {
    return this.classesService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() classes: UpdateClassDto, @Req() req: Request) {
    return this.classesService.update(req["user"]["sub"], id, classes);
  }
  
}

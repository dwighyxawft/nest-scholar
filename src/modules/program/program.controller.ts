import { Controller, Get, Post, Delete, Patch , Param, Body} from '@nestjs/common';
import { ProgramService } from './program.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramInfoDto } from './dto/update-program-info.dto';
import { UpdateTimetableDto } from './dto/update-timetable.dto';

@Controller('program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Get()
  getPrograms(){
    return this.programService.getPrograms();
  }

  @Get(":id")
  getProgramById(@Param("id") id: string){
    return this.programService.getProgramById(id);
  }

  @Get(":course")
  getProgramByCourses(@Param("course") course: string){
    return this.programService.getProgramsByCourseId(course);
  }

  @Post("create")
  createProgram(@Body() program: CreateProgramDto){
    return this.programService.createProgram(program)
  }

  @Patch("settings/:course/info/:id")
  updateProgramInfo(@Body() update: UpdateProgramInfoDto, @Param("id") id: string, @Param("course") course: string){
    return this.programService.updateProgramInfo(id, course, update);
  }

  @Patch("settings/:course/timetable/:id")
  updateTimetable(@Body() update: UpdateTimetableDto, @Param("id") id: string, @Param("course") course: string){
    return this.programService.updateTimetable(id, course, update);
  }

  @Delete("delete/:course/program/:id")
  deleteProgram(@Param("id") id: string, @Param("course") course: string){
    return this.programService.deleteProgram(id, course);
  }
  
}

import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from './schema/course.schema';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService],
  imports: [MongooseModule.forFeature([
    {
      name: "Course",
      schema: CourseSchema
    }
  ])],
  exports: [CoursesService]
})
export class CoursesModule {}

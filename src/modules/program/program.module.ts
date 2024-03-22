import { Module } from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramController } from './program.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgramSchema } from './schema/program.schema';
import { CoursesModule } from '../courses/courses.module';

@Module({
  controllers: [ProgramController],
  providers: [ProgramService],
  imports: [MongooseModule.forFeature([
    {
      name: "Program",
      schema: ProgramSchema
    }
  ]), CoursesModule],
  exports: [ProgramService]
})
export class ProgramModule {}

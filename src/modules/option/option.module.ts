import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionController } from './option.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OptionSchema } from './schema/option.schema';
import { QuestionModule } from '../question/question.module';

@Module({
  controllers: [OptionController],
  providers: [OptionService],
  imports: [MongooseModule.forFeature([
    {
      name: "Option",
      schema: OptionSchema
    }
  ])],
  exports: [OptionService]
})
export class OptionModule {}

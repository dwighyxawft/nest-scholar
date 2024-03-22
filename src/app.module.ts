import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { CoursesModule } from './modules/courses/courses.module';
import { ExamsModule } from './modules/exams/exams.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClassesModule } from './modules/classes/classes.module';
import { MongooseConfigModule } from './config/mongoose.config';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { MiddlewareConsumer } from '@nestjs/common';
import { NestModule } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common';
import { ProgramModule } from './modules/program/program.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { QuestionModule } from './modules/question/question.module';
import { OptionModule } from './modules/option/option.module';
import { AnswerModule } from './modules/answer/answer.module';

@Module({
  imports: [UsersModule, CoursesModule, ExamsModule, AuthModule, ClassesModule, MongooseConfigModule, ProgramModule, TransactionModule, QuestionModule, OptionModule, AnswerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AuthMiddleware).forRoutes({path: "*", method: RequestMethod.ALL});
  }
}

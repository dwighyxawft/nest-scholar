import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { VerifySchema } from './schema/verification.schema';
import { CoursesModule } from '../courses/courses.module';
import { HttpModule } from '@nestjs/axios';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [MongooseModule.forFeature([
    {
      name: "User",
      schema: UserSchema
    },
    {
      name: "Verification",
      schema: VerifySchema
    }
  ]), CoursesModule, HttpModule, TransactionModule],
  exports: [UsersService]
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from './schema/transaction.schema';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [MongooseModule.forFeature([
    {
      name: "Transaction",
      schema: TransactionSchema
    }
  ])],
  exports: [TransactionService]
})
export class TransactionModule {}

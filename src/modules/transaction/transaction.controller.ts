import { Controller, Get, Patch, Param, Delete, Query, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}


  @Get("all")
  findAll() {
    return this.transactionService.getTransactions();
  }

  @Get("users/:id")
  findByUser(@Param("id") id: string) {
    return this.transactionService.getTransactionByUser(id);
  }
  
  @Get("course/:id")
  findByCourse(@Param("id") id: string) {
    return this.transactionService.getTransactionByCourse(id);
  }

  @Get("ref")
  findByReference(@Query("reference") reference: string) {
    return this.transactionService.getTransactionByRef(reference);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.getTransactionById(id);
  }

  @Patch('status/:id')
  update(@Param('id') id: string, @Body() updateTransactionDto: {status: "pending" | "completed" | "failed"}) {
    return this.transactionService.updateTransaction(id, updateTransactionDto);
  }

  @Patch('ref')
  updateByRef(@Query('reference') reference: string, @Body() updateTransactionDto: {status: "pending" | "completed" | "failed"}) {
    return this.transactionService.updateTransactionByRef(reference, updateTransactionDto);
  }

  @Delete(':id')
  removeById(@Param('id') id: string) {
    return this.transactionService.deleteTransactionById(id);
  }

  @Delete('course/:id')
  removeByCourse(@Param('id') id: string) {
    return this.transactionService.deleteTransactionByCourse(id);
  }

  @Delete('user/:id')
  remove(@Param('id') id: string) {
    return this.transactionService.deleteTransactionByUser(id);
  }
}

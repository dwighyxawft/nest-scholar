import { Injectable } from '@nestjs/common';
import * as nodemailer from "nodemailer";
import { ITransaction } from './interface/transaction.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './schema/transaction.schema';

@Injectable()
export class TransactionService {
  private transporter = nodemailer.Transporter;
  constructor(@InjectModel("Transaction") private readonly transactionModel: Model<ITransaction>){
    this.transporter = nodemailer.createTransport({
      host: 'smtp-relay.sendinblue.com', // Your SMTP server host
      port: 587, // Your SMTP server port
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'amuoladipupo@gmail.com', // Your SMTP username
        pass: 'bXfgDO2VMpZGFE19', // Your SMTP password
      },
    })
  }
  public async getTransactionById(id: string) {
    return await this.transactionModel.findOne({_id: id}).exec();
  }

  public async createTransaction(transaction: CreateTransactionDto): Promise<Transaction | undefined> {
    const newTransaction = await new this.transactionModel(transaction);
    return await newTransaction.save();
  }

  public async getTransactionByUser(id: string): Promise<Transaction[] | undefined> {
    return await this.transactionModel.find({user_id: id}).exec();
  }

  public async getTransactions(): Promise<Transaction[] | undefined> {
    return await this.transactionModel.find().exec();
  }

  public async getTransactionByRef(reference: string): Promise<Transaction | undefined>{
    return await this.transactionModel.findOne({reference: reference}).exec();
  }

  public async getTransactionByCourse(id: string): Promise<Transaction[] | undefined> {
    return await this.transactionModel.find({course_id: id}).exec();
  }

  public async updateTransaction(id: string, update: {status: "pending" | "completed" | "failed"}){
    return await this.transactionModel.updateOne({_id: id}, {status: update.status}).exec()
  }

  public async updateTransactionByRef(reference: string, update: {status: "pending" | "completed" | "failed"}){
    return await this.transactionModel.updateOne({reference: reference}, {status: update.status}).exec()
  }

  public async deleteTransactionByCourse(id: string) {
    return await this.transactionModel.deleteMany({course_id: id}).exec();
  }

  public async deleteTransactionByUser(id: string) {
    return await this.transactionModel.deleteMany({user_id: id}).exec();
  }

  public async deleteTransactionById(id: string) {
    return await this.transactionModel.deleteOne({_id: id}).exec();
  }
}

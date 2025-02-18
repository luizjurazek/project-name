import { Body, Controller, Post, Get, Delete, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import {
  CreateTransactionDto,
  deleteTransactionByIdDto,
  getTransactionsByUserIdDto,
  updateTransactionDto,
} from './transactions.dto';
import { Transaction } from '@prisma/client';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('create-transaction')
  public async createTransaction(
    @Body()
    transactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const transaction: Transaction =
      await this.transactionsService.createTransaction(transactionDto);

    return transaction;
  }

  @Get('get-transactions-by-user-id')
  // Alterar para receber diretamente da req o user id
  public async getTransactionsByUserId(
    @Body()
    payload: getTransactionsByUserIdDto,
  ): Promise<Transaction[]> {
    const transactions: Transaction[] =
      await this.transactionsService.getTransactionsByUserId(payload);
    return transactions;
  }

  @Delete('delete-transaction-by-id')
  public async deleteTransactionById(
    @Body()
    payload: deleteTransactionByIdDto,
  ): Promise<Transaction> {
    const deletedTransaction: Transaction =
      await this.transactionsService.deleteTransactionById(payload);

    return deletedTransaction;
  }

  @Put('update-transaction')
  public async updateTransaction(
    @Body()
    payload: updateTransactionDto,
  ): Promise<Transaction> {
    const updatedTransaction: Transaction =
      await this.transactionsService.updateTransactionById(payload);
    return updatedTransaction;
  }
}

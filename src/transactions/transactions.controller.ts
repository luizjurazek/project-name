import { Body, Controller, Post, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './transactions.dto';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('create-transaction')
  public async createTransaction(
    @Body()
    transactionDto: CreateTransactionDto,
  ) {
    const transaction: any =
      await this.transactionsService.createTransaction(transactionDto);

    return transaction;
  }

  @Get('get-transactions-by-user-id')
  // Alterar para receber diretamente da req o user id
  public async getTransactionsByUserId(userId: number) {
    const transactions: any =
      await this.transactionsService.getTransactionsByUserId(userId);

    return transactions;
  }
}

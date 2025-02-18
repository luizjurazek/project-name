import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Transaction } from '@prisma/client';
import { CreateTransactionDto } from './transactions.dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async createTransaction(transactionDto: CreateTransactionDto): Promise<any> {
    const transaction = await this.prisma.transaction.create({
      data: transactionDto,
    });

    return transaction;
  }

  async getTransactionsByUserId(id: number): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: { userId: id },
    });

    if (!transactions || transactions.length === 0) {
      throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
    }

    return transactions;
  }
}

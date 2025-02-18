import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Transaction } from '@prisma/client';
import {
  CreateTransactionDto,
  deleteTransactionByIdDto,
  getTransactionsByUserIdDto,
  updateTransactionDto,
} from './transactions.dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async createTransaction(
    transactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const transaction = await this.prisma.transaction.create({
      data: transactionDto,
    });

    return transaction;
  }

  async getTransactionsByUserId(
    payload: getTransactionsByUserIdDto,
  ): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: { userId: payload.userId },
    });

    if (!transactions || transactions.length === 0) {
      throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
    }

    return transactions;
  }

  async deleteTransactionById(
    payload: deleteTransactionByIdDto,
  ): Promise<Transaction> {
    const transactionDeleted = await this.prisma.transaction.delete({
      where: {
        id: payload.id,
        userId: payload.userId,
      },
    });

    if (!transactionDeleted) {
      throw new HttpException('Transaction not deleted', HttpStatus.NOT_FOUND);
    }

    return transactionDeleted;
  }

  async updateTransactionById(
    payload: updateTransactionDto,
  ): Promise<Transaction> {
    const { id, userId, ...updateData } = payload;

    const existingTransaction = await this.prisma.transaction.findUnique({
      where: { id },
    });

    if (!existingTransaction) {
      throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
    }

    if (existingTransaction.userId !== userId) {
      throw new HttpException(
        'You are not allowed to edit this transaction',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return this.prisma.transaction.update({
      where: { id },
      data: updateData,
    });
  }
}

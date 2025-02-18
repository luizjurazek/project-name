import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEnum } from 'class-validator';
import { TransactionMode, TransactionStatus } from '@prisma/client';

export class CreateTransactionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly categoryId: number;

  @ApiProperty()
  @IsString()
  readonly resume: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @ApiProperty({ enum: TransactionMode })
  @IsEnum(TransactionMode)
  readonly type: TransactionMode;

  @ApiProperty({ enum: TransactionStatus })
  @IsEnum(TransactionStatus)
  readonly status: TransactionStatus;
}

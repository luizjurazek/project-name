import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
  IsOptional,
  IsPositive,
} from 'class-validator';
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

export class getTransactionsByUserIdDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;
}

export class deleteTransactionByIdDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
}

export class updateTransactionDto {
  @IsNumber()
  readonly id: number;

  @IsNumber()
  readonly userId: number;

  @IsOptional()
  @IsString()
  readonly resume?: string;

  @IsOptional()
  @IsPositive()
  readonly amount?: number;

  @IsOptional()
  @IsEnum(TransactionMode)
  readonly type?: TransactionMode;

  @IsOptional()
  @IsEnum(TransactionStatus)
  readonlystatus?: TransactionStatus;
}

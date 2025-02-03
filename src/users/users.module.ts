import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  imports: [UsersService],
})
export class UsersModule {}

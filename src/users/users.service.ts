import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  LoginUserDto,
  UpdatePasswordDto,
  getUserDto,
} from './users.user.dto';
import { compare, hash } from 'bcrypt';
import { PrismaService } from '@/prisma/prisma.service';
import { User, Role } from '@prisma/client';

interface FormatLogin extends Partial<User> {
  email: string;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUser(id: number): Promise<Omit<User, 'password'> | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // Use by module to change user password
  async updatePassword(payload: UpdatePasswordDto, id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HttpException('Invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    // Compare passwords
    const areEqual: boolean = await compare(
      payload.old_password,
      user.password,
    );

    if (!areEqual) {
      throw new HttpException('Invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    // Hash new password and return to user
    const hashedPassword: string = await hash(payload.new_password, 10);
    return await this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }

  // User by auth module to register user in database
  async create(userDto: CreateUserDto): Promise<any> {
    // Check if the user exists in the db
    const userInDb = await this.prisma.user.findFirst({
      where: { email: userDto.email },
    });

    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.user.create({
      data: {
        ...userDto,
        role: Role.CLIENT,
        password: await hash(userDto.password, 10),
      },
    });
  }

  // use by module to login user
  async findByEmail({ email, password }: LoginUserDto): Promise<FormatLogin> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new HttpException('Invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual: boolean = await compare(password, user.password);

    if (!areEqual) {
      throw new HttpException('Invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    const { password: removedPassword, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // use by auth module to get user in database
  async findByPayload({ email }: any): Promise<any> {
    return await this.prisma.user.findFirst({
      where: { email },
    });
  }
}

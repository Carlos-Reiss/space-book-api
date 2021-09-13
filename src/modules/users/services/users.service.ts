import { User } from '.prisma/client';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/services/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const userFindEmailExist = await this.prisma.user.findUnique({
      where: { email: data.email },
      select: {
        email: true,
        id: true,
        username: true,
      },
    });

    if (userFindEmailExist) {
      throw new BadRequestException('user email already exist in database');
    }

    const user = await this.prisma.user.create({
      data: data,
    });
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({});
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('user not found in database');
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}

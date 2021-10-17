import { PrismaService } from '@/prisma/services/prisma.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<UserEntity> {
    const userFindEmailExist = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (userFindEmailExist) {
      throw new BadRequestException('user email already exist in database');
    }

    const user = await this.prisma.user.create({
      data: data,
      select: {
        id: true,
        email: true,
        username: true,
      },
    });
    return user as UserEntity;
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      where: {},
      select: {
        id: true,
        email: true,
        username: true,
      },
    });
    return users as UserEntity[];
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    if (!user) {
      throw new NotFoundException('user not found in database');
    }
    return user as UserEntity;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user as UserEntity;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const findAndUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!findAndUser) {
      throw new NotFoundException('user not found in database');
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    return user as UserEntity;
  }

  async remove(id: string): Promise<UserEntity> {
    const findAndUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!findAndUser) {
      throw new NotFoundException('user not found in database');
    }
    const user = await this.prisma.user.delete({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    return user as UserEntity;
  }
}

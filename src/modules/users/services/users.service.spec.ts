import { User } from '.prisma/client';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@/prisma/services/prisma.service';
import { v4 as uuid } from 'uuid';

import {
  Context,
  createMockContext,
  MockContext,
} from '@/context/test/context';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let mockCtx: MockContext;
  let ctx: Context;

  const user: User = {
    id: uuid(),
    username: 'carlos',
    email: 'carlos@gmail.com',
    password: '123',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;

    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(ctx.prisma)
      .compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should create new user', async () => {
    mockCtx.prisma.user.create.mockResolvedValue(user);
    await expect(service.create(user)).resolves.toStrictEqual(user);
  });

  it('should not be possible update a user', async () => {
    mockCtx.prisma.user.update.mockImplementation(() => {
      throw new NotFoundException('user not found in database');
    });
    await expect(service.update(user.id, user)).rejects.toThrow(
      'user not found in database',
    );
  });

  it('should be not possible to delete the user', async () => {
    mockCtx.prisma.user.delete.mockImplementation(() => {
      throw new NotFoundException('user not found in database');
    });

    await expect(service.remove(user.id)).rejects.toThrow(
      'user not found in database',
    );
  });
});

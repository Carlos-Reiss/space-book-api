import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../prisma/services/prisma.service';
import {
  Context,
  createMockContext,
  MockContext,
} from './../../../context/test/context';
import { UserEntity } from './../entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let mockCtx: MockContext;
  let ctx: Context;

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
    const user: UserEntity = {
      username: 'carlos',
      email: 'carlos@gmail.com',
      password: '123',
    };
    mockCtx.prisma.user.create.mockResolvedValue({
      id: '5500eea8-f513-469c-96a3-c6a7b47c26c1',
      ...user,
    });
    await expect(service.create(user)).resolves.toStrictEqual({
      id: '5500eea8-f513-469c-96a3-c6a7b47c26c1',
      ...user,
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockImplementation((user) => ({
              access_token: 'test-token',
            })),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('register', () => {
    it('should register a new user', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);
      (prismaService.user.create as jest.Mock).mockResolvedValue({
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        password: 'hashed',
        role: 'user',
        isActive: true,
      });

      const result = await controller.register({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      });

      expect(result).toHaveProperty('access_token');
      expect(result.user.email).toBe('test@example.com');
    });

    it('should throw conflict if email exists', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue({ id: '1', email: 'test@example.com' });

      await expect(
        controller.register({ email: 'test@example.com', password: '123456', name: 'Test User' }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('login', () => {
    it('should login a valid user', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue({
        id: '1',
        email: 'test@example.com',
        password: await require('bcrypt').hash('password123', 10),
        name: 'Test User',
        role: 'user',
        isActive: true,
      });

      const result = await controller.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result).toHaveProperty('access_token');
      expect(result.user.email).toBe('test@example.com');
    });

    it('should throw unauthorized if user not found', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        controller.login({ email: 'missing@example.com', password: '123456' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
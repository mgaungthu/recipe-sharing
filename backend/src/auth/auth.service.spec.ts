import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mocked_access_token'),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return access_token when login is called', async () => {
      const user = { id: '123', email: 'test@example.com' };
      const result = await service.login(user);

      expect(jwtService.sign).toHaveBeenCalledWith({ sub: user.id, email: user.email });
      expect(result).toEqual({ access_token: 'mocked_access_token' });
    });
  });

  describe('emailExists', () => {
    it('should return true if user exists', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValueOnce({ id: '123' });

      const result = await service.emailExists('test@example.com');
      expect(result).toBe(true);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
        select: { id: true },
      });
    });

    it('should return false if user does not exist', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValueOnce(null);

      const result = await service.emailExists('missing@example.com');
      expect(result).toBe(false);
    });
  });
});
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('signed-jwt-token'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should return access_token when login is called', async () => {
    const user = { id: 'user-id', email: 'user@example.com' };
    const result = await authService.login(user);
    expect(result).toEqual({ access_token: 'signed-jwt-token' });
  });

  it('should call JwtService.sign with correct payload', async () => {
    const user = { id: 'user-id', email: 'user@example.com' };
    await authService.login(user);
    expect(jwtService.sign).toHaveBeenCalledWith({ sub: user.id, email: user.email });
  });
});
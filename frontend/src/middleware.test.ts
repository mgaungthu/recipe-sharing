jest.mock('next/server', () => ({
  NextResponse: {
    redirect: jest.fn().mockReturnValue({
      cookies: { set: jest.fn() },
    }),
    next: jest.fn().mockReturnValue({
      cookies: { set: jest.fn() },
    }),
  },
}));

import { NextRequest, NextResponse } from 'next/server';
import { middleware } from './middleware';
import { ROUTES } from './utils/routes';

describe('Middleware', () => {
  const mockReq = (path: string, token?: string) =>
    ({
      nextUrl: { pathname: path },
      cookies: {
        get: jest.fn().mockReturnValue(token ? { value: token } : undefined),
      },
      url: 'http://localhost' + path,
    }) as unknown as NextRequest;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect unauthenticated user from /recipe/create to /login', () => {
    const req = mockReq(ROUTES.RECIPE.CREATE);
    middleware(req);

    expect(NextResponse.redirect).toHaveBeenCalledWith(expect.any(URL));
  });

  it('should allow authenticated user to access /recipe/create', () => {
    const req = mockReq(ROUTES.RECIPE.CREATE, 'token123');
    middleware(req);

    expect(NextResponse.next).toHaveBeenCalled();
  });

  it('should redirect logged-in user away from /login', () => {
    const req = mockReq(ROUTES.AUTH.LOGIN, 'token123');
    middleware(req);

    expect(NextResponse.redirect).toHaveBeenCalled();
  });

  it('should allow normal routes for logged-out users', () => {
    const req = mockReq('/about');
    middleware(req);

    expect(NextResponse.next).toHaveBeenCalled();
  });
});
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';  
import { PrismaService } from '../prisma.service';   
import { EmailCheckGateway } from './email-check.gateway';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController], 
  providers: [AuthService, EmailCheckGateway, JwtStrategy, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
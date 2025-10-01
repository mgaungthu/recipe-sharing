import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';


@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {


    switch (exception.code) {
      case 'P2002': // Unique constraint violation
        throw new ConflictException(
          `Duplicate value for unique field: ${exception.meta?.target}`,
        );

      case 'P2025': // Record not found
        throw new NotFoundException('Record not found');

      default:
        throw new InternalServerErrorException('Database error occurred');
    }
  }
}
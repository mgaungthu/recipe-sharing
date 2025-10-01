import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {


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
import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { IException, IFormatExceptionMessage } from './exceptions.interface';

@Injectable()
export class ExceptionsService implements IException {
  badRequestException(data: IFormatExceptionMessage): void {
    throw new BadRequestException({
      ...data,
      status_code: HttpStatus.BAD_REQUEST,
    });
  }

  internalServerErrorException(data?: IFormatExceptionMessage): void {
    throw new InternalServerErrorException({
      ...data,
      status_code: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }

  forbiddenException(data?: IFormatExceptionMessage): void {
    throw new ForbiddenException({
      ...data,
      status_code: HttpStatus.FORBIDDEN,
    });
  }

  UnauthorizedException(data?: IFormatExceptionMessage): void {
    throw new UnauthorizedException({
      ...data,
      status_code: HttpStatus.UNAUTHORIZED,
    });
  }
}

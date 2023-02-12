import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

function exceptionFactory(errors: ValidationError[]): BadRequestException {
  return new BadRequestException(
    errors.reduce(
      (messages, error) => ({
        ...messages,
        [error.property]: Object.values(error.constraints),
      }),
      {},
    ),
  );
}

export default exceptionFactory;

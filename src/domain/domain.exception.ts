import { DomainErrorCode } from './domain-error-code.enum';

export abstract class DomainException extends Error {
  abstract readonly code: DomainErrorCode;

  abstract readonly message: string;
}

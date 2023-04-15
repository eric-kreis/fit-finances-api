import { DomainErrorCode } from './enums';

export abstract class DomainException extends Error {
  abstract readonly code: DomainErrorCode;

  abstract readonly message: string;
}

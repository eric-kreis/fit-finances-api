import { DomainErrorCode } from '@domain/domain-error-code.enum';
import { DomainException } from '@domain/domain.exception';

export class ManagerForbiddenException extends DomainException {
  code = DomainErrorCode.ManagerForbidden;

  message = 'Missing sufficient permissions';

  constructor(message?: string) {
    super();
    this.message = message || this.message;
  }
}

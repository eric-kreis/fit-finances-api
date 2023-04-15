import { DomainException } from '@domain/domain.exception';
import { DomainErrorCode } from '@domain/enums';

export class ManagerForbiddenException extends DomainException {
  code = DomainErrorCode.ManagerForbidden;

  message = 'Missing sufficient permissions';

  constructor(message?: string) {
    super();
    this.message = message || this.message;
  }
}

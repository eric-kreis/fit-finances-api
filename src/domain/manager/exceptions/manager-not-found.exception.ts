import { DomainException } from '@domain/domain.exception';
import { DomainErrorCode } from '@domain/enums';

export class ManagerNotFoundException extends DomainException {
  code = DomainErrorCode.ManagerNotFound;

  message = 'Manager not found';

  constructor(message?: string) {
    super();
    this.message = message || this.message;
  }
}

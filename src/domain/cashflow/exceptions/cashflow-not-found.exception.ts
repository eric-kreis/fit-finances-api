import { DomainException } from '@domain/domain.exception';
import { DomainErrorCode } from '@domain/enums';

export class CashNotFoundException extends DomainException {
  code = DomainErrorCode.CashflowNotFound;

  message = 'Cashflow not found';

  constructor(message?: string) {
    super();
    this.message = message || this.message;
  }
}

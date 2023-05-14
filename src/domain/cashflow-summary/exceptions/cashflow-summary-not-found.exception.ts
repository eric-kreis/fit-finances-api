import { DomainException } from '@domain/domain.exception';
import { DomainErrorCode } from '@domain/enums';

export class CashflowSummaryNotFoundException extends DomainException {
  code = DomainErrorCode.CashflowSummaryNotFound;

  message = 'Summary not found';

  constructor(message?: string) {
    super();
    this.message = message || this.message;
  }
}
